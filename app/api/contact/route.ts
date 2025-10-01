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

    if (!response.ok) {
      throw new Error('Webhook submission failed');
    }

    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return new Response(
      JSON.stringify({ 
        message: 'Er is iets misgegaan bij het versturen van het formulier' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}