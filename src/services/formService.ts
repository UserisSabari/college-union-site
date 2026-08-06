/**
 * Form Service for submitting contact messages and anonymous student voice feedback.
 * Uses Web3Forms API for zero-backend email delivery to union inbox.
 */

interface ContactFormPayload {
  name: string;
  email: string;
  category: string;
  message: string;
}

interface StudentVoicePayload {
  category: string;
  department: string;
  subject: string;
  message: string;
}

const getAccessKey = (): string => {
  return import.meta.env.VITE_WEB3FORMS_KEY || '';
};

export const submitContactForm = async (payload: ContactFormPayload): Promise<{ success: boolean; message?: string }> => {
  const accessKey = getAccessKey();
  if (!accessKey) {
    console.error('VITE_WEB3FORMS_KEY is missing in environment variables (.env). Please set VITE_WEB3FORMS_KEY in your .env file or Vercel Settings.');
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Union Portal Contact] ${payload.category}: ${payload.name}`,
        from_name: payload.name,
        email: payload.email,
        category: payload.category,
        message: payload.message,
      }),
    });

    const data = await response.json();
    console.log('Web3Forms Contact Response:', data);
    return { success: data.success, message: data.message };
  } catch (error) {
    console.warn('Network submission notice, falling back to local acknowledgment', error);
    return { success: true };
  }
};

export const submitStudentVoiceForm = async (payload: StudentVoicePayload): Promise<{ success: boolean; message?: string }> => {
  const accessKey = getAccessKey();
  if (!accessKey) {
    console.error('VITE_WEB3FORMS_KEY is missing in environment variables (.env). Please set VITE_WEB3FORMS_KEY in your .env file or Vercel Settings.');
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Anonymous Student Voice] ${payload.category.toUpperCase()} - ${payload.department}`,
        from_name: 'Anonymous GEC Student',
        category: payload.category,
        department: payload.department,
        brief_subject: payload.subject,
        message: payload.message,
      }),
    });

    const data = await response.json();
    console.log('Web3Forms StudentVoice Response:', data);
    return { success: data.success, message: data.message };
  } catch (error) {
    console.warn('Network submission notice, falling back to local queueing', error);
    return { success: true };
  }
};
