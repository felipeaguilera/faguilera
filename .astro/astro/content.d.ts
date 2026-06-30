declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"notebook": {
"a-barbarians-red-eyes-were-lurking.md": {
	id: "a-barbarians-red-eyes-were-lurking.md";
  slug: "a-barbarians-red-eyes-were-lurking";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"a-complete-unknown.md": {
	id: "a-complete-unknown.md";
  slug: "a-complete-unknown";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"a-killer-a-composer-and-a-cursed.md": {
	id: "a-killer-a-composer-and-a-cursed.md";
  slug: "a-killer-a-composer-and-a-cursed";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"a-real-pain.md": {
	id: "a-real-pain.md";
  slug: "a-real-pain";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"a-small-note-about-whats-next.md": {
	id: "a-small-note-about-whats-next.md";
  slug: "a-small-note-about-whats-next";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"adolescence-a-teenager-crime-unraveled.md": {
	id: "adolescence-a-teenager-crime-unraveled.md";
  slug: "adolescence-a-teenager-crime-unraveled";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"affinity-a-different-kind-of-free.md": {
	id: "affinity-a-different-kind-of-free.md";
  slug: "affinity-a-different-kind-of-free";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"anora-a-dance-of-raw-tension.md": {
	id: "anora-a-dance-of-raw-tension.md";
  slug: "anora-a-dance-of-raw-tension";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"beautiful-nonsense-when-prompting.md": {
	id: "beautiful-nonsense-when-prompting.md";
  slug: "beautiful-nonsense-when-prompting";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"becoming-the-burglar-what-bilbo-baggins.md": {
	id: "becoming-the-burglar-what-bilbo-baggins.md";
  slug: "becoming-the-burglar-what-bilbo-baggins";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"black-mirror-common-people-review.md": {
	id: "black-mirror-common-people-review.md";
  slug: "black-mirror-common-people-review";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"black-mirror-eulogy-a-look-into-memory.md": {
	id: "black-mirror-eulogy-a-look-into-memory.md";
  slug: "black-mirror-eulogy-a-look-into-memory";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"bobo-the-end-of-a-good-cycle.md": {
	id: "bobo-the-end-of-a-good-cycle.md";
  slug: "bobo-the-end-of-a-good-cycle";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"bottoms-up-the-volcanic-love-of-lobsters.md": {
	id: "bottoms-up-the-volcanic-love-of-lobsters.md";
  slug: "bottoms-up-the-volcanic-love-of-lobsters";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"bugonia-why-logic-is-defenseless.md": {
	id: "bugonia-why-logic-is-defenseless.md";
  slug: "bugonia-why-logic-is-defenseless";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"casablanca-1942-review-the-myth-the.md": {
	id: "casablanca-1942-review-the-myth-the.md";
  slug: "casablanca-1942-review-the-myth-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"case-study-zmartcl-leading-the-gaming.md": {
	id: "case-study-zmartcl-leading-the-gaming.md";
  slug: "case-study-zmartcl-leading-the-gaming";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"civil-war-in-america-the-pop-tart.md": {
	id: "civil-war-in-america-the-pop-tart.md";
  slug: "civil-war-in-america-the-pop-tart";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"cold-war-alert-from-may-to-december.md": {
	id: "cold-war-alert-from-may-to-december.md";
  slug: "cold-war-alert-from-may-to-december";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"conclave.md": {
	id: "conclave.md";
  slug: "conclave";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"coup-de-chance-review.md": {
	id: "coup-de-chance-review.md";
  slug: "coup-de-chance-review";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"cynicism-is-the-enemy-of-community.md": {
	id: "cynicism-is-the-enemy-of-community.md";
  slug: "cynicism-is-the-enemy-of-community";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"david-lynch.md": {
	id: "david-lynch.md";
  slug: "david-lynch";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"design-in-the-age-of-dialogue-how.md": {
	id: "design-in-the-age-of-dialogue-how.md";
  slug: "design-in-the-age-of-dialogue-how";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"erasing-the-memory-of-some-perfect.md": {
	id: "erasing-the-memory-of-some-perfect.md";
  slug: "erasing-the-memory-of-some-perfect";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/a-barbarians-red-eyes-were-lurking.md": {
	id: "es/a-barbarians-red-eyes-were-lurking.md";
  slug: "es/a-barbarians-red-eyes-were-lurking";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/a-complete-unknown.md": {
	id: "es/a-complete-unknown.md";
  slug: "es/a-complete-unknown";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/a-killer-a-composer-and-a-cursed.md": {
	id: "es/a-killer-a-composer-and-a-cursed.md";
  slug: "es/a-killer-a-composer-and-a-cursed";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/a-real-pain.md": {
	id: "es/a-real-pain.md";
  slug: "es/a-real-pain";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/a-small-note-about-whats-next.md": {
	id: "es/a-small-note-about-whats-next.md";
  slug: "es/a-small-note-about-whats-next";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/adolescence-a-teenager-crime-unraveled.md": {
	id: "es/adolescence-a-teenager-crime-unraveled.md";
  slug: "es/adolescence-a-teenager-crime-unraveled";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/anora-a-dance-of-raw-tension.md": {
	id: "es/anora-a-dance-of-raw-tension.md";
  slug: "es/anora-a-dance-of-raw-tension";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/becoming-the-burglar-what-bilbo-baggins.md": {
	id: "es/becoming-the-burglar-what-bilbo-baggins.md";
  slug: "es/becoming-the-burglar-what-bilbo-baggins";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/black-mirror-common-people-review.md": {
	id: "es/black-mirror-common-people-review.md";
  slug: "es/black-mirror-common-people-review";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/black-mirror-eulogy-a-look-into-memory.md": {
	id: "es/black-mirror-eulogy-a-look-into-memory.md";
  slug: "es/black-mirror-eulogy-a-look-into-memory";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/bobo-the-end-of-a-good-cycle.md": {
	id: "es/bobo-the-end-of-a-good-cycle.md";
  slug: "es/bobo-the-end-of-a-good-cycle";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/bottoms-up-the-volcanic-love-of-lobsters.md": {
	id: "es/bottoms-up-the-volcanic-love-of-lobsters.md";
  slug: "es/bottoms-up-the-volcanic-love-of-lobsters";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/bugonia-why-logic-is-defenseless.md": {
	id: "es/bugonia-why-logic-is-defenseless.md";
  slug: "es/bugonia-why-logic-is-defenseless";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/casablanca-1942-review-the-myth-the.md": {
	id: "es/casablanca-1942-review-the-myth-the.md";
  slug: "es/casablanca-1942-review-the-myth-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/civil-war-in-america-the-pop-tart.md": {
	id: "es/civil-war-in-america-the-pop-tart.md";
  slug: "es/civil-war-in-america-the-pop-tart";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/cold-war-alert-from-may-to-december.md": {
	id: "es/cold-war-alert-from-may-to-december.md";
  slug: "es/cold-war-alert-from-may-to-december";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/conclave.md": {
	id: "es/conclave.md";
  slug: "es/conclave";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/coup-de-chance-review.md": {
	id: "es/coup-de-chance-review.md";
  slug: "es/coup-de-chance-review";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/cynicism-is-the-enemy-of-community.md": {
	id: "es/cynicism-is-the-enemy-of-community.md";
  slug: "es/cynicism-is-the-enemy-of-community";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/david-lynch.md": {
	id: "es/david-lynch.md";
  slug: "es/david-lynch";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/erasing-the-memory-of-some-perfect.md": {
	id: "es/erasing-the-memory-of-some-perfect.md";
  slug: "es/erasing-the-memory-of-some-perfect";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/grave-of-the-fireflies-review-the.md": {
	id: "es/grave-of-the-fireflies-review-the.md";
  slug: "es/grave-of-the-fireflies-review-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/gta-vi-is-more-than-a-game-its-a.md": {
	id: "es/gta-vi-is-more-than-a-game-its-a.md";
  slug: "es/gta-vi-is-more-than-a-game-its-a";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/hamnet-review-a-survival-story-in.md": {
	id: "es/hamnet-review-a-survival-story-in.md";
  slug: "es/hamnet-review-a-survival-story-in";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/im-still-here-a-mothers-quiet-resistance.md": {
	id: "es/im-still-here-a-mothers-quiet-resistance.md";
  slug: "es/im-still-here-a-mothers-quiet-resistance";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/jay-kelly-review-the-fragile-ecosystem.md": {
	id: "es/jay-kelly-review-the-fragile-ecosystem.md";
  slug: "es/jay-kelly-review-the-fragile-ecosystem";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/juror-2.md": {
	id: "es/juror-2.md";
  slug: "es/juror-2";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/landman-into-the-texas-oil-inferno.md": {
	id: "es/landman-into-the-texas-oil-inferno.md";
  slug: "es/landman-into-the-texas-oil-inferno";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/marty-supreme-review-the-exhausting.md": {
	id: "es/marty-supreme-review-the-exhausting.md";
  slug: "es/marty-supreme-review-the-exhausting";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/mickey-17-sci-fi-clones-and-the-problem.md": {
	id: "es/mickey-17-sci-fi-clones-and-the-problem.md";
  slug: "es/mickey-17-sci-fi-clones-and-the-problem";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/mountainhead-when-tech-power-forgets.md": {
	id: "es/mountainhead-when-tech-power-forgets.md";
  slug: "es/mountainhead-when-tech-power-forgets";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/one-battle-after-another-review-the.md": {
	id: "es/one-battle-after-another-review-the.md";
  slug: "es/one-battle-after-another-review-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/one-hundred-years-of-solitude-part.md": {
	id: "es/one-hundred-years-of-solitude-part.md";
  slug: "es/one-hundred-years-of-solitude-part";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/paradise-season-1-a-thrill-ride-with.md": {
	id: "es/paradise-season-1-a-thrill-ride-with.md";
  slug: "es/paradise-season-1-a-thrill-ride-with";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/past-lives-review.md": {
	id: "es/past-lives-review.md";
  slug: "es/past-lives-review";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/pluribus-first-impressions-when-unity.md": {
	id: "es/pluribus-first-impressions-when-unity.md";
  slug: "es/pluribus-first-impressions-when-unity";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/rehearsing-a-sick-life-in-a-promised.md": {
	id: "es/rehearsing-a-sick-life-in-a-promised.md";
  slug: "es/rehearsing-a-sick-life-in-a-promised";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/rental-family-review-intimacy-as.md": {
	id: "es/rental-family-review-intimacy-as.md";
  slug: "es/rental-family-review-intimacy-as";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/scoop-the-asteroids-are-comedy-kings.md": {
	id: "es/scoop-the-asteroids-are-comedy-kings.md";
  slug: "es/scoop-the-asteroids-are-comedy-kings";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/sentimental-value-review-turning.md": {
	id: "es/sentimental-value-review-turning.md";
  slug: "es/sentimental-value-review-turning";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/sinners-review-a-marvel-of-cultural.md": {
	id: "es/sinners-review-a-marvel-of-cultural.md";
  slug: "es/sinners-review-a-marvel-of-cultural";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-american-bridges-of-saltburn.md": {
	id: "es/the-american-bridges-of-saltburn.md";
  slug: "es/the-american-bridges-of-saltburn";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-apocalypse-is-now-not-in-the.md": {
	id: "es/the-apocalypse-is-now-not-in-the.md";
  slug: "es/the-apocalypse-is-now-not-in-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-apprentice-review-more-than-just.md": {
	id: "es/the-apprentice-review-more-than-just.md";
  slug: "es/the-apprentice-review-more-than-just";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-arrogance-of-the-sighted-lessons.md": {
	id: "es/the-arrogance-of-the-sighted-lessons.md";
  slug: "es/the-arrogance-of-the-sighted-lessons";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-beast-in-me-when-strong-bones.md": {
	id: "es/the-beast-in-me-when-strong-bones.md";
  slug: "es/the-beast-in-me-when-strong-bones";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-brutalist.md": {
	id: "es/the-brutalist.md";
  slug: "es/the-brutalist";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-case-of-bridget-jones-vs-shogun.md": {
	id: "es/the-case-of-bridget-jones-vs-shogun.md";
  slug: "es/the-case-of-bridget-jones-vs-shogun";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-coherent-reality-of-blackberry.md": {
	id: "es/the-coherent-reality-of-blackberry.md";
  slug: "es/the-coherent-reality-of-blackberry";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-curious-case-of-hbo-max-when.md": {
	id: "es/the-curious-case-of-hbo-max-when.md";
  slug: "es/the-curious-case-of-hbo-max-when";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-day-a-head-exploded.md": {
	id: "es/the-day-a-head-exploded.md";
  slug: "es/the-day-a-head-exploded";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-fallout-of-arcane-wastelands.md": {
	id: "es/the-fallout-of-arcane-wastelands.md";
  slug: "es/the-fallout-of-arcane-wastelands";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-rehearsal-season-2-simulations.md": {
	id: "es/the-rehearsal-season-2-simulations.md";
  slug: "es/the-rehearsal-season-2-simulations";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-room-next-door-2024.md": {
	id: "es/the-room-next-door-2024.md";
  slug: "es/the-room-next-door-2024";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-secret-agent-review-surviving.md": {
	id: "es/the-secret-agent-review-surviving.md";
  slug: "es/the-secret-agent-review-surviving";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-short-and-lovely-curse-of-the.md": {
	id: "es/the-short-and-lovely-curse-of-the.md";
  slug: "es/the-short-and-lovely-curse-of-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-studio-season-1-review-behind.md": {
	id: "es/the-studio-season-1-review-behind.md";
  slug: "es/the-studio-season-1-review-behind";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-three-muppets-problems-a-furiosa.md": {
	id: "es/the-three-muppets-problems-a-furiosa.md";
  slug: "es/the-three-muppets-problems-a-furiosa";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/the-white-lotus-season-3-review-more.md": {
	id: "es/the-white-lotus-season-3-review-more.md";
  slug: "es/the-white-lotus-season-3-review-more";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/there-and-back-again-bringing-the.md": {
	id: "es/there-and-back-again-bringing-the.md";
  slug: "es/there-and-back-again-bringing-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/tolkien-and-riddles-in-the-dark-the.md": {
	id: "es/tolkien-and-riddles-in-the-dark-the.md";
  slug: "es/tolkien-and-riddles-in-the-dark-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/weapons-film-review-a-promising-start.md": {
	id: "es/weapons-film-review-a-promising-start.md";
  slug: "es/weapons-film-review-a-promising-start";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/welcome-the-slam-dunk-of-wrexham.md": {
	id: "es/welcome-the-slam-dunk-of-wrexham.md";
  slug: "es/welcome-the-slam-dunk-of-wrexham";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/wicked-and-wickedfor-good-when-explaining.md": {
	id: "es/wicked-and-wickedfor-good-when-explaining.md";
  slug: "es/wicked-and-wickedfor-good-when-explaining";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"es/yellowstone.md": {
	id: "es/yellowstone.md";
  slug: "es/yellowstone";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"evocl-report-of-20240124.md": {
	id: "evocl-report-of-20240124.md";
  slug: "evocl-report-of-20240124";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"evocl.md": {
	id: "evocl.md";
  slug: "evocl";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"from-prompt-to-product-how-i-actually.md": {
	id: "from-prompt-to-product-how-i-actually.md";
  slug: "from-prompt-to-product-how-i-actually";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"grave-of-the-fireflies-review-the.md": {
	id: "grave-of-the-fireflies-review-the.md";
  slug: "grave-of-the-fireflies-review-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"gta-vi-is-more-than-a-game-its-a.md": {
	id: "gta-vi-is-more-than-a-game-its-a.md";
  slug: "gta-vi-is-more-than-a-game-its-a";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"hamnet-review-a-survival-story-in.md": {
	id: "hamnet-review-a-survival-story-in.md";
  slug: "hamnet-review-a-survival-story-in";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"im-still-here-a-mothers-quiet-resistance.md": {
	id: "im-still-here-a-mothers-quiet-resistance.md";
  slug: "im-still-here-a-mothers-quiet-resistance";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"jay-kelly-review-the-fragile-ecosystem.md": {
	id: "jay-kelly-review-the-fragile-ecosystem.md";
  slug: "jay-kelly-review-the-fragile-ecosystem";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"juror-2.md": {
	id: "juror-2.md";
  slug: "juror-2";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"landman-into-the-texas-oil-inferno.md": {
	id: "landman-into-the-texas-oil-inferno.md";
  slug: "landman-into-the-texas-oil-inferno";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"marty-supreme-review-the-exhausting.md": {
	id: "marty-supreme-review-the-exhausting.md";
  slug: "marty-supreme-review-the-exhausting";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"mi-factoria-from-functional-store.md": {
	id: "mi-factoria-from-functional-store.md";
  slug: "mi-factoria-from-functional-store";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"mickey-17-sci-fi-clones-and-the-problem.md": {
	id: "mickey-17-sci-fi-clones-and-the-problem.md";
  slug: "mickey-17-sci-fi-clones-and-the-problem";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"mountainhead-when-tech-power-forgets.md": {
	id: "mountainhead-when-tech-power-forgets.md";
  slug: "mountainhead-when-tech-power-forgets";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"one-battle-after-another-review-the.md": {
	id: "one-battle-after-another-review-the.md";
  slug: "one-battle-after-another-review-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"one-hundred-years-of-solitude-part.md": {
	id: "one-hundred-years-of-solitude-part.md";
  slug: "one-hundred-years-of-solitude-part";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"openai-apps-from-chat-to-platform.md": {
	id: "openai-apps-from-chat-to-platform.md";
  slug: "openai-apps-from-chat-to-platform";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"paradise-season-1-a-thrill-ride-with.md": {
	id: "paradise-season-1-a-thrill-ride-with.md";
  slug: "paradise-season-1-a-thrill-ride-with";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"passkeys-sound-cool-but-heres-why.md": {
	id: "passkeys-sound-cool-but-heres-why.md";
  slug: "passkeys-sound-cool-but-heres-why";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"past-lives-review.md": {
	id: "past-lives-review.md";
  slug: "past-lives-review";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"pluribus-first-impressions-when-unity.md": {
	id: "pluribus-first-impressions-when-unity.md";
  slug: "pluribus-first-impressions-when-unity";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"rehearsing-a-sick-life-in-a-promised.md": {
	id: "rehearsing-a-sick-life-in-a-promised.md";
  slug: "rehearsing-a-sick-life-in-a-promised";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"rental-family-review-intimacy-as.md": {
	id: "rental-family-review-intimacy-as.md";
  slug: "rental-family-review-intimacy-as";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"samsungs-color-e-paper-is-nice-but.md": {
	id: "samsungs-color-e-paper-is-nice-but.md";
  slug: "samsungs-color-e-paper-is-nice-but";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"scoop-the-asteroids-are-comedy-kings.md": {
	id: "scoop-the-asteroids-are-comedy-kings.md";
  slug: "scoop-the-asteroids-are-comedy-kings";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"sentimental-value-review-turning.md": {
	id: "sentimental-value-review-turning.md";
  slug: "sentimental-value-review-turning";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"sinners-review-a-marvel-of-cultural.md": {
	id: "sinners-review-a-marvel-of-cultural.md";
  slug: "sinners-review-a-marvel-of-cultural";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-american-bridges-of-saltburn.md": {
	id: "the-american-bridges-of-saltburn.md";
  slug: "the-american-bridges-of-saltburn";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-antidote-to-slop-why-im-trading.md": {
	id: "the-antidote-to-slop-why-im-trading.md";
  slug: "the-antidote-to-slop-why-im-trading";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-apocalypse-is-now-not-in-the.md": {
	id: "the-apocalypse-is-now-not-in-the.md";
  slug: "the-apocalypse-is-now-not-in-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-apprentice-review-more-than-just.md": {
	id: "the-apprentice-review-more-than-just.md";
  slug: "the-apprentice-review-more-than-just";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-arrogance-of-the-sighted-lessons.md": {
	id: "the-arrogance-of-the-sighted-lessons.md";
  slug: "the-arrogance-of-the-sighted-lessons";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-beast-in-me-when-strong-bones.md": {
	id: "the-beast-in-me-when-strong-bones.md";
  slug: "the-beast-in-me-when-strong-bones";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-brutalist.md": {
	id: "the-brutalist.md";
  slug: "the-brutalist";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-case-of-bridget-jones-vs-shogun.md": {
	id: "the-case-of-bridget-jones-vs-shogun.md";
  slug: "the-case-of-bridget-jones-vs-shogun";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-coherent-reality-of-blackberry.md": {
	id: "the-coherent-reality-of-blackberry.md";
  slug: "the-coherent-reality-of-blackberry";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-curious-case-of-hbo-max-when.md": {
	id: "the-curious-case-of-hbo-max-when.md";
  slug: "the-curious-case-of-hbo-max-when";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-day-a-head-exploded.md": {
	id: "the-day-a-head-exploded.md";
  slug: "the-day-a-head-exploded";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-fallout-of-arcane-wastelands.md": {
	id: "the-fallout-of-arcane-wastelands.md";
  slug: "the-fallout-of-arcane-wastelands";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-rehearsal-season-2-simulations.md": {
	id: "the-rehearsal-season-2-simulations.md";
  slug: "the-rehearsal-season-2-simulations";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-room-next-door-2024.md": {
	id: "the-room-next-door-2024.md";
  slug: "the-room-next-door-2024";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-secret-agent-review-surviving.md": {
	id: "the-secret-agent-review-surviving.md";
  slug: "the-secret-agent-review-surviving";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-short-and-lovely-curse-of-the.md": {
	id: "the-short-and-lovely-curse-of-the.md";
  slug: "the-short-and-lovely-curse-of-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-studio-season-1-review-behind.md": {
	id: "the-studio-season-1-review-behind.md";
  slug: "the-studio-season-1-review-behind";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-three-muppets-problems-a-furiosa.md": {
	id: "the-three-muppets-problems-a-furiosa.md";
  slug: "the-three-muppets-problems-a-furiosa";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"the-white-lotus-season-3-review-more.md": {
	id: "the-white-lotus-season-3-review-more.md";
  slug: "the-white-lotus-season-3-review-more";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"there-and-back-again-bringing-the.md": {
	id: "there-and-back-again-bringing-the.md";
  slug: "there-and-back-again-bringing-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"tolkien-and-riddles-in-the-dark-the.md": {
	id: "tolkien-and-riddles-in-the-dark-the.md";
  slug: "tolkien-and-riddles-in-the-dark-the";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"weapons-film-review-a-promising-start.md": {
	id: "weapons-film-review-a-promising-start.md";
  slug: "weapons-film-review-a-promising-start";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"welcome-the-slam-dunk-of-wrexham.md": {
	id: "welcome-the-slam-dunk-of-wrexham.md";
  slug: "welcome-the-slam-dunk-of-wrexham";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"why-2fa-still-matters-even-when-it.md": {
	id: "why-2fa-still-matters-even-when-it.md";
  slug: "why-2fa-still-matters-even-when-it";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"wicked-and-wickedfor-good-when-explaining.md": {
	id: "wicked-and-wickedfor-good-when-explaining.md";
  slug: "wicked-and-wickedfor-good-when-explaining";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
"yellowstone.md": {
	id: "yellowstone.md";
  slug: "yellowstone";
  body: string;
  collection: "notebook";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
