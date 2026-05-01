interface Schedule {
  name: string
  expression: string
  handler: () => Promise<void>
}

export const schedules: Schedule[] = [
  // Scheduled jobs are registered here as they're built in future sprints.
  // Example:
  //   {
  //     name: 'safelock-inactivity-check',
  //     expression: '0 2 * * *',   // Nightly 2am UTC
  //     handler: runSafelockInactivityCheck,
  //   },
  //   {
  //     name: 'consultation-reminders',
  //     expression: '0 * * * *',   // Hourly
  //     handler: runConsultationReminders,
  //   },
]
