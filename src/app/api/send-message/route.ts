import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/app/service/transporter";
import { formSchema } from "@/app/libs/validations/form-contact-schema";
import { getTranslations } from "next-intl/server";

const abortedResponse = () =>
  new NextResponse(null, {
    status: 499,
    statusText: "Client Closed Request",
  });

export async function POST(req: NextRequest) {
  const signal = req.signal;

  if (signal.aborted) {
    return abortedResponse();
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  try {
    const schema = formSchema(t);

    const body = await req.json();

    const data = schema.safeParse(body);

    if (data.error) {
      return NextResponse.json(
        { msg: data.error.issues[0].message },
        { status: 400 }
      );
    }

    if (signal.aborted) {
      return abortedResponse();
    }

    const { email, topic, message } = data.data;

    await transporter.verify();

    if (signal.aborted) abortedResponse();

    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: topic,
      text: message,
      html: `
      <p><b>Email:</b> ${email}</p>
        <p><b>Topic:</b> ${topic}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    if (info.rejected.length > 0) {
      console.warn("Some recipients were rejected:", info.rejected);
      return NextResponse.json(
        { msg: t("responsesAPI.sendFailed") },
        { status: 400 }
      );
    }

    if (signal.aborted) {
      console.warn("Email sent but client already disconnected");
    }

    return NextResponse.json({ msg: t("responsesAPI.200") }, { status: 200 });
  } catch (e) {
    console.error("ERROR: ", e);

    return NextResponse.json({ msg: t("responsesAPI.500") }, { status: 500 });
  }
}
