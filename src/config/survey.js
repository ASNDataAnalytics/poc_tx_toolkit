// =============================================================================
//  src/config/survey.js
//
//  THIS IS THE ONLY FILE YOU NEED TO EDIT to change survey content.
//
//  QUESTION TYPES:
//    text       — single-line input
//    textarea   — multi-line input  (option: rows)
//    likert     — rating scale      (options: min, max, minLabel, maxLabel)
//    slider     — numeric slider    (options: min, max, defaultVal)
//    radio      — single choice     (option: options[])
//    checkbox   — multi-choice      (option: options[])
//    select     — dropdown          (option: options[])
//    number     — numeric input     (options: min, max)
//    date       — date picker
//
//  CONDITIONAL LOGIC  (showIf):
//    Show if answer equals a value:
//      showIf: { questionId: "q_id", value: "Yes" }
//
//    Show if a checkbox group includes a value:
//      showIf: { questionId: "q_id", includes: "Nephrology" }
//
//    Show if a number is below/above a threshold:
//      showIf: { questionId: "nps", lessThan: 7 }
//      showIf: { questionId: "nps", greaterThan: 8 }
//
//    Show if ALL conditions are true:
//      showIf: { all: [ { questionId: "q1", value: "Yes" }, { questionId: "nps", lessThan: 7 } ] }
//
//    Show if ANY condition is true:
//      showIf: { any: [ { questionId: "q1", value: "Yes" }, { questionId: "q2", value: "Yes" } ] }
//
//  showIf works on both individual questions AND entire pages.
// =============================================================================

export const SURVEY_TITLE = 'Patient Experience Survey'
export const SURVEY_SUBTITLE = 'Your responses are never transmitted or stored outside this browser.'

export const SURVEY = [
  // ── Page 1: Respondent Info ────────────────────────────────────────────────
  {
    id: 'about',
    title: 'About You',
    description: 'Tell us a bit about yourself.',
    questions: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'e.g. Jane Smith',
        required: true,
      },
      {
        id: 'role',
        type: 'select',
        label: 'Role',
        options: ['Physician', 'Nurse', 'Patient', 'Caregiver', 'Administrator', 'Other'],
        required: true,
      },
      {
        id: 'role_other',
        type: 'text',
        label: 'Please specify your role',
        placeholder: 'Your role...',
        // Only shown when "Other" is selected above
        showIf: { questionId: 'role', value: 'Other' },
      },
      {
        id: 'org',
        type: 'text',
        label: 'Organization',
        placeholder: 'e.g. General Hospital',
      },
      {
        id: 'visit_date',
        type: 'date',
        label: 'Date of visit',
      },
    ],
  },

  // ── Page 2: Satisfaction Ratings ──────────────────────────────────────────
  {
    id: 'ratings',
    title: 'Satisfaction Ratings',
    description: 'Rate each item from 1 (Strongly Disagree) to 5 (Strongly Agree).',
    questions: [
      {
        id: 'q_care',
        type: 'likert',
        label: 'The care provided met my expectations',
        min: 1, max: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
      },
      {
        id: 'q_communication',
        type: 'likert',
        label: 'Staff communicated clearly and respectfully',
        min: 1, max: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
      },
      {
        id: 'q_wait',
        type: 'likert',
        label: 'Wait times were acceptable',
        min: 1, max: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
      },
      {
        id: 'q_concerns',
        type: 'likert',
        label: 'My concerns were taken seriously',
        min: 1, max: 5,
        minLabel: 'Strongly Disagree',
        maxLabel: 'Strongly Agree',
      },
    ],
  },

  // ── Page 3: Low Score Follow-up ───────────────────────────────────────────
  // This entire page is only shown if ANY likert score was 1 or 2.
  // For simplicity in the demo we trigger on the care score being low.
  // In production you could use an "any" condition across all likert ids.
  {
    id: 'low_score_followup',
    title: 'We\'d Like to Understand More',
    description: 'We noticed some lower ratings. Your feedback helps us improve.',
    showIf: { questionId: 'q_care', lessThan: 3 },
    questions: [
      {
        id: 'low_score_areas',
        type: 'checkbox',
        label: 'Which areas fell short of your expectations? (Select all that apply)',
        options: [
          'Communication',
          'Wait times',
          'Staff attitude',
          'Cleanliness',
          'Treatment quality',
          'Follow-up care',
          'Billing / admin',
        ],
      },
      {
        id: 'low_score_detail',
        type: 'textarea',
        label: 'Can you tell us more about what happened?',
        placeholder: 'Please describe your experience...',
        rows: 4,
      },
    ],
  },

  // ── Page 4: Overall Experience ────────────────────────────────────────────
  {
    id: 'overall',
    title: 'Overall Experience',
    description: 'A few final questions about your overall impression.',
    questions: [
      {
        id: 'nps',
        type: 'slider',
        label: 'How likely are you to recommend us to a friend or colleague? (0–10)',
        min: 0,
        max: 10,
        defaultVal: 7,
      },
      {
        id: 'strengths',
        type: 'checkbox',
        label: 'What did we do well? (Select all that apply)',
        options: [
          'Clinical expertise',
          'Communication',
          'Wait times',
          'Cleanliness',
          'Staff friendliness',
          'Follow-up care',
          'Patient education',
          'Scheduling / access',
        ],
      },
      {
        id: 'return',
        type: 'radio',
        label: 'Would you return for future care?',
        options: ['Definitely yes', 'Probably yes', 'Probably no', 'Definitely no'],
      },
    ],
  },

  // ── Page 5: Open Feedback ─────────────────────────────────────────────────
  {
    id: 'feedback',
    title: 'Open Feedback',
    description: 'Optional — share anything else on your mind.',
    questions: [
      {
        id: 'positive',
        type: 'textarea',
        label: 'What worked well?',
        placeholder: 'Describe positive experiences...',
        rows: 3,
      },
      {
        id: 'improve',
        type: 'textarea',
        label: 'What could be improved?',
        placeholder: 'Describe areas for improvement...',
        rows: 3,
      },
      {
        id: 'contact_ok',
        type: 'radio',
        label: 'May we contact you to follow up on your feedback?',
        options: ['Yes', 'No'],
      },
      {
        id: 'contact_email',
        type: 'text',
        label: 'Your email address',
        placeholder: 'you@example.com',
        // Only shown if they said Yes above
        showIf: { questionId: 'contact_ok', value: 'Yes' },
      },
    ],
  },
]
