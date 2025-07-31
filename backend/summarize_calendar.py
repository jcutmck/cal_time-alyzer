import json
from datetime import datetime
from collections import defaultdict
import csv

# Load the calendar JSON
with open('outcal.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

events = data.get('value', [])

# Group durations by event subject
durations = defaultdict(float)  # in minutes

for event in events:
    subject = event.get('subject') or 'Untitled'
    
    # Skip if subject contains "OoO" or "PTO" (case-insensitive)
    if 'ooo' in subject.lower() or 'pto' in subject.lower():
        print(f"Filtered out: {subject}")
        continue
    else:
        print(f"✅ Keeping: {subject}")
    
    start_str = event.get('start', {}).get('dateTime')
    end_str = event.get('end', {}).get('dateTime')

    if start_str and end_str:
        try:
            start = datetime.fromisoformat(start_str.rstrip('Z'))
            end = datetime.fromisoformat(end_str.rstrip('Z'))
            minutes = (end - start).total_seconds() / 60
            durations[subject] += minutes
            print(f"Added {minutes:.2f} minutes for: {subject}")
        except Exception as e:
            print(f"Error parsing event: {subject} — {e}")

# Assume time range = 8 weeks (adjustable)
weeks = 8

# Output results
print(f"{'Subject':40} | {'Total Hours':>12} | {'Avg Hours/Week':>15}")
print("-" * 72)

for subject, total_minutes in sorted(durations.items(), key=lambda x: -x[1]):
    hours = total_minutes / 60
    avg_per_week = hours / weeks
    print(f"{subject[:40]:40} | {hours:12.2f} | {avg_per_week:15.2f}")

# Optional: Save to CSV
with open('event_summary.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Subject', 'Total Hours', 'Average Hours per Week'])
    for subject, total_minutes in durations.items():
        hours = total_minutes / 60
        avg_per_week = hours / weeks
        writer.writerow([subject, f"{hours:.2f}", f"{avg_per_week:.2f}"])

print("\n✅ Summary written to event_summary.csv")