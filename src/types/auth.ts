import z from "zod";

export const authDTOEntityShema = z.object({
    credential:     z.union([z.string(), z.email()]),
    password:       z.string().min(0).max(24),
});

export const authEntityResponseShema = z.object({
    id:         z.number(),
    name:       z.string(),
    email:      z.string(),
    authToken:  z.string(),
});

export type authDTOEntityType = z.infer<typeof authDTOEntityShema>;
export type authEntityResponseType = z.infer<typeof authEntityResponseShema>;