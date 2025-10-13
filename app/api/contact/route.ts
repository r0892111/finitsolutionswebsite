import { type NextRequest } from 'next/server';
import { contactFormSchema } from '@/lib/schema';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate the incoming data
    const validatedData = contactFormSchema.parse(data);

    const response = await fetch('https://alexfinit.app.n8n.cloud/webhook/03451c85-9d5c-4463-884a-7689e19b0917', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    const responseData = await response.json();
    console.log('Webhook response:', responseData);

    if (!response.ok) {
      console.error('Webhook returned non-OK status:', response.status);
      throw new Error(`Webhook submission failed with status ${response.status}`);
    }

    return new Response(JSON.stringify({ message: 'Success', data: responseData }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Contact form submission error:', error);

    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return new Response(
      JSON.stringify({
        message: 'Er is iets misgegaan bij het versturen van het formulier',
        error: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}