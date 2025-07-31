1. Generate .JSON file and place in this application directory. Ex. Using Microsoft Graph, query to gather these details. Here is an example graph query:

https://graph.microsoft.com/v1.0/me/calendarView?startDateTime=2025-05-01T00:00:00Z&endDateTime=2025-07-31T23:59:59Z&$top=1000&$select=subject,start,end


2. Run the summarize_calendar.py in terminal. A .csv should be generated within this app directory. 


3. Hope this was helpful, enjoy!