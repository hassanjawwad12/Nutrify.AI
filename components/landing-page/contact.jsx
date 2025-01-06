import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

const Contact = () => {
  return (
    <section className="py-16 2xl:py-[120px]">
      <div className="container">
        <div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-2  items-center gap-10">
          <div>
            <Card className="max-w-[600px]">
              <CardContent className="p-5 xl:p-8">
                <h2 className="text-xl xl:text-2xl  font-semibold text-default-900 mb-3">
                  Support
                </h2>
                <p className="text-sm xl:text-base  text-default-700">
                  If you have any questions or encounter issues with our script,
                  our support team is available to assist you. They'll respond
                  to inquiries and provide limited support through our dedicated
                  support system.
                </p>
                <Button asChild className="mt-5">
                  <Link
                    href="https://codeshaperbd.freshdesk.com/support/login"
                    target="_blank"
                  >
                    Get Support{" "}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="max-w-[600px]">
              <CardContent className="p-5 xl:p-8">
                <div>
                  <h2 className="text-xl xl:text-2xl font-semibold text-default-900 mb-3">
                    Community
                  </h2>
                  <p className=" text-sm xl:text-base text-default-700">
                    Your question may have already been addressed on our Discord
                    server. Feel free to ask any questions about our template
                    there as well. Join our Discord server to connect with us.
                  </p>
                  <Button asChild className="mt-5">
                    <Link href="/dashboard"> Join Comunity </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
