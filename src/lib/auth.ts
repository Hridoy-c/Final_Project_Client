import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("Final_Project");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        required: false,
        defaultValue: "seeker",
        input: true,
      },
    },
  },
  databaseHooks: {
  user: {
    create: {
      before: async (user) => {
        // Never trust the client: only seeker/recruiter can be self-selected
        const role = user.role === 'recruiter' ? 'recruiter' : 'seeker'
        return { data: { ...user, role } }
      },
    },
  },
},
});
