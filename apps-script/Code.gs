const CONFIG = Object.freeze({
  ADMIN_EMAIL: 'info@vacstrust.org',
  SHEETS: Object.freeze({
    member: 'Members',
    volunteer: 'Volunteers',
    collaboration: 'Collaborations',
    support: 'Support'
  })
});

const HEADERS = Object.freeze([
  'Submission ID', 'Timestamp', 'Full Name', 'Email', 'Phone', 'City',
  'Industry Role', 'Years Experience', 'Areas of Interest',
  'Skills', 'Availability', 'Preferred Contribution',
  'Organisation', 'Collaboration Type', 'Proposal Summary',
  'Type of Support', 'Preferred Contact Method', 'Message', 'Consent', 'Status'
]);

function doGet() {
  return jsonResponse({
    success: true,
    message: 'Connect With Us API is running.'
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No submission data received.');
    }

    const data = JSON.parse(e.postData.contents);
    validateSubmission(data);
    lock.waitLock(15000);

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error('This Apps Script must be created from the submissions spreadsheet.');
    }

    const sheetName = CONFIG.SHEETS[data.formType];
    const sheet = getOrCreateSheet(spreadsheet, sheetName);
    const submissionId = createSubmissionId(data.formType);
    const timestamp = new Date();

    sheet.appendRow(buildRow(data, submissionId, timestamp));
    lock.releaseLock();

    try {
      sendNotification(data, submissionId, timestamp);
    } catch (notificationError) {
      console.error('Submission saved, but notification failed: ' + notificationError.message);
    }

    return jsonResponse({
      success: true,
      submissionId: submissionId,
      message: 'Your enquiry has been received successfully.'
    });
  } catch (error) {
    console.error(error);
    return jsonResponse({
      success: false,
      error: error.message || 'Something went wrong.'
    });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function validateSubmission(data) {
  const allowedForms = Object.keys(CONFIG.SHEETS);
  if (!allowedForms.includes(data.formType)) throw new Error('Invalid form type.');

  ['fullName', 'email', 'phone', 'city'].forEach(function(field) {
    if (!data[field] || String(data[field]).trim() === '') {
      throw new Error('Missing required field: ' + field);
    }
  });

  if (data.consent !== true) throw new Error('Consent is required.');
  if (!isValidEmail(data.email)) throw new Error('Please provide a valid email address.');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function getOrCreateSheet(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#EF5A2A')
      .setFontColor('#FFFFFF');
  }

  return sheet;
}

function createSubmissionId(formType) {
  const prefix = {
    member: 'MEM',
    volunteer: 'VOL',
    collaboration: 'COL',
    support: 'SUP'
  }[formType];

  const properties = PropertiesService.getScriptProperties();
  const key = 'COUNTER_' + prefix;
  const counter = Number(properties.getProperty(key) || 0) + 1;
  properties.setProperty(key, String(counter));

  return 'VACS-' + prefix + '-' + String(counter).padStart(5, '0');
}

function buildRow(data, submissionId, timestamp) {
  return [
    submissionId, timestamp, data.fullName || '', data.email || '', data.phone || '', data.city || '',
    data.industryRole || '', data.yearsExperience || '', data.areasOfInterest || '',
    data.skills || '', data.availability || '', data.preferredContribution || '',
    data.organisation || '', data.collaborationType || '', data.proposalSummary || '',
    data.typeOfSupport || '', data.preferredContactMethod || '', data.message || '',
    data.consent ? 'Yes' : 'No', 'NEW'
  ];
}

function sendNotification(data, submissionId, timestamp) {
  const formName = getFormName(data.formType);
  const subject = 'New ' + formName + ' enquiry — ' + submissionId;
  const body = [
    'New enquiry received through the website.', '',
    'Submission ID: ' + submissionId,
    'Received: ' + timestamp,
    'Form: ' + formName,
    'Name: ' + data.fullName,
    'Email: ' + data.email,
    'Phone: ' + data.phone,
    'City: ' + data.city,
    'Message: ' + (data.message || 'No message provided.'), '',
    'Please check the Connect With Us spreadsheet for the complete submission.'
  ].join('\n');

  MailApp.sendEmail({to: CONFIG.ADMIN_EMAIL, subject: subject, body: body});
}

function getFormName(formType) {
  return {
    member: 'Become a Member',
    volunteer: 'Volunteer',
    collaboration: 'Collaborate',
    support: 'Support the Mission'
  }[formType] || 'Website Enquiry';
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
