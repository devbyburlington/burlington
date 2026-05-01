type JobHandler = (payload: Record<string, unknown>) => Promise<void>

export const handlers: Record<string, JobHandler> = {
  // Job handlers are registered here as they're built in future sprints.
  // Example:
  //   'send_booking_confirmation': async (payload) => { ... }
  //   'send_consultation_reminder': async (payload) => { ... }
}
