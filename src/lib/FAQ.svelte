<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from './components/ui/accordion';
</script>

<section id="faq" class="scroll-mt-20 space-y-6 py-8 md:py-12 lg:py-20">
	<div
		class="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-4 px-4 text-center sm:px-6 lg:px-8"
	>
		<h2 class="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">FAQ</h2>
		<p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			Common questions about implementing and using HeartCheck.
		</p>
	</div>

	<div class="mx-auto w-full max-w-[64rem] px-4 sm:px-6 lg:px-8">
		<Accordion type="single" value="one">
			<AccordionItem value="one">
				<AccordionTrigger>Is HeartCheck a compliance framework?</AccordionTrigger>
				<AccordionContent>
					No. HeartCheck standardizes transparency, not compliance. Metrics are self‑assessed and
					third parties verify claims.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="two">
				<AccordionTrigger>Does /heart require authentication?</AccordionTrigger>
				<AccordionContent>
					No. The endpoint SHOULD be public and read‑only to enable monitoring and broad access.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="three">
				<AccordionTrigger>Is JSON‑LD required?</AccordionTrigger>
				<AccordionContent>
					Yes. JSON‑LD provides semantic clarity and interoperability across services and tools.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="four">
				<AccordionTrigger>What if we lack some documents?</AccordionTrigger>
				<AccordionContent>
					Start with what you have. Include privacy and terms first, then add transparency reports
					as available.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="five">
				<AccordionTrigger>How often should timestamp update?</AccordionTrigger>
				<AccordionContent>
					On each regeneration of the response, or at least when governance document metadata
					changes.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</div>
</section>
