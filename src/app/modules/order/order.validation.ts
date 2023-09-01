import { z } from "zod";



const createOrder = z.object({
  body: z.object({
      orderedBooks: z.array(z.string(), {
          required_error: "Ordered Book is required"
      }),
  }),
});