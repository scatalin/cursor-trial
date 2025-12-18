function doPost(e) {
  try {
    // Log the incoming request
    Logger.log("=== New Request Received ===");
    Logger.log("Timestamp: " + new Date());
    Logger.log("Request parameters: " + JSON.stringify(e.parameter));
    Logger.log("Request postData: " + (e.postData ? e.postData.contents : "No postData"));
    
    // Replace "YOUR_SHEET_ID_HERE" with your actual Sheet ID
    var sheetId = "1AyEOhnteQgBBTuhP-DA6qkNY4BACHT9CDtiemYJO6XI";
    Logger.log("Attempting to open sheet with ID: " + sheetId);
    
    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Script-Output");
    Logger.log("Sheet opened successfully");
    
    // Get form data
    var name = e.parameter.name || '';
    var email = e.parameter.email || '';
    var phone = e.parameter.phone || '';
    
    Logger.log("Form data extracted - Name: " + name + ", Email: " + email + ", Phone: " + phone);
    
    // Create row data: [Timestamp, Name, Email, Phone]
    var data = [
      new Date(),
      name,
      email,
      phone
    ];
    
    Logger.log("Prepared data row: " + JSON.stringify(data));
    
    // Append the row to the sheet
    sheet.appendRow(data);
    Logger.log("Data appended successfully to sheet");
    
    // Return success response
    Logger.log("=== Request Completed Successfully ===");
    return ContentService.createTextOutput("Success")
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    // Log the error details
    Logger.log("=== ERROR OCCURRED ===");
    Logger.log("Error message: " + error.toString());
    Logger.log("Error stack: " + error.stack);
    Logger.log("Request that caused error: " + JSON.stringify(e));
    
    // Return error response
    return ContentService.createTextOutput("Error: " + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}


