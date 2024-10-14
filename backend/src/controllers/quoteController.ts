import { FastifyPluginAsync } from 'fastify';
import { quoteValidationGuard } from '../guards/validationGuard';
import { ExchangeRateResponse, QuoteQuery } from '../types/types';

const quoteController: FastifyPluginAsync = async (fastify) => {
  fastify.get('/quote', { preHandler: quoteValidationGuard }, async (request, reply) => {
    const { baseCurrency, quoteCurrency, baseAmount } = request.query as QuoteQuery;

    try {
      const result: ExchangeRateResponse = await fastify.services.exchangeService.getQuote(baseCurrency, quoteCurrency, baseAmount);
      fastify.log.info(`Quote retrieved: ${JSON.stringify(result)}`);
      return reply.send(result);
    } catch (error: any) {
      fastify.log.error(`Error processing quote: ${error.message}`);
      return reply.status(400).send({ error: error.message });
    }
  });
};

export default quoteController;
