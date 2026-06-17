import type { Request, Response } from 'express';
import { Webhook } from 'svix';
import { ENV } from '../../config/ENV.js';
import { prisma } from '../../lib/prisma.js';
import type { WebhookEvent } from '@clerk/backend';

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const wh = new Webhook(ENV.CLERK_WEBHOOK_KEY);
    const evt = wh.verify(req.body, req.headers as any) as WebhookEvent;

    if (evt.type === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url } =
        evt.data;
      const primaryEmail = email_addresses[0]?.email_address;
      if (!primaryEmail) {
        return res.status(400).json({ error: 'No email found' });
      }

      const user = await prisma.user.create({
        data: {
          id: id,
          email: primaryEmail,
          name: `${first_name} ${last_name}`.trim(),
          avatar: image_url,
        },
      });

      console.log('User created:', user);
      return res.status(200).json({ success: true, user });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(200).json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
