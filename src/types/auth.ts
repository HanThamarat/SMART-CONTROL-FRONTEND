import z from "zod";

export const authDTOEntityShema = z.object({
    credential:     z.union([z.string().min(3), z.email()]),
    password:       z.string().min(6).max(24),
});

export const authEntityResponseShema = z.object({
    id:         z.number(),
    name:       z.string(),
    email:      z.string(),
    authToken:  z.string(),
});

export type authDTOEntityType = z.infer<typeof authDTOEntityShema>;
export type authEntityResponseType = z.infer<typeof authEntityResponseShema>;