import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { validateQuoteQuery } from './validation';

export const quoteValidationGuard = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  if (!validateQuoteQuery(request.query)) {
    request.log.warn('Invalid request parameters');
    reply.status(400).send({ error: 'Invalid parameters' });
    return;
  }
  done();
};
