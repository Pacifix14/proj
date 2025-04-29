import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/server";
import { HelpCircle, Mail } from "lucide-react";

const HelpCenterPage = async () => {
	const adminEmails = await api.user.getAdminEmails();
	return (
		<div className="container mx-auto max-w-5xl px-4 py-8">
			<div className="mb-12 text-center">
				<h1 className="mb-4 bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text font-bold text-4xl text-transparent sm:text-5xl">
					How can we help you?
				</h1>
			</div>

			<Tabs defaultValue="support" className="mb-12">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="support">Support</TabsTrigger>
					<TabsTrigger value="faq">FAQ</TabsTrigger>
					<TabsTrigger value="contact">Contact</TabsTrigger>
				</TabsList>

				<TabsContent value="support" className="mt-6">
					<div className="flex items-center justify-center">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Mail className="h-5 w-5 text-purple-500" />
									Email Support
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="mb-4 text-muted-foreground">
									Get help via email. Response within 12-24 business hours.
								</p>
								<div className="flex items-center justify-center">
									<Button variant="outline">
										<a
											href="mailto:noah.moehtet@gmail.com"
											className="flex items-center gap-2"
										>
											<Mail className="h-5 w-5" />
											noah.moehtet@gmail.com
										</a>
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="faq" className="mt-6">
					<Card>
						<CardContent className="pt-6">
							<Accordion type="single" collapsible>
								<AccordionItem value="item-1">
									<AccordionTrigger>How do I get access?</AccordionTrigger>
									<AccordionContent>
										Access is granted by our system administrators. Please
										contact our support team with your request and credentials.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-2">
									<AccordionTrigger>
										What are the support hours?
									</AccordionTrigger>
									<AccordionContent>
										Our support team is available Monday through Friday, 10 AM
										to 6 PM EST. Emergency support is available 24/7 for
										critical issues.
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="contact" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{adminEmails && adminEmails.length > 0 ? (
									adminEmails.map((adminEmail) => (
										<Button
											variant="outline"
											className="flex w-full items-center justify-start gap-3"
											key={adminEmail.email}
										>
											<a
												href={`mailto:${adminEmail.email}`}
												className="flex items-center gap-3"
											>
												<Mail className="h-5 w-5 text-purple-500" />
												<span>{adminEmail.email}</span>
											</a>
										</Button>
									))
								) : (
									<div>No admin emails available</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<div className="mt-8 text-center">
				<div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
					<HelpCircle className="h-4 w-4" />
					<span>Still need help? </span>
					<a
						href="mailto:noah.moehtet@gmail.com"
						className="text-purple-500 hover:underline"
					>
						Contact our team
					</a>
				</div>
			</div>
		</div>
	);
};

export default HelpCenterPage;
