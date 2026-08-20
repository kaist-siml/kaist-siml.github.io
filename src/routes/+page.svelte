<script>
    import home from 'data/home.yaml';
    import people from 'data/people.yaml';
    import publication from 'data/publication.yaml';
    import Footer from 'components/Footer.svelte';
    import Header from 'components/Header.svelte';
    import HomeHero from 'components/HomeHero.svelte';
    import JoinLab from 'components/JoinLab.svelte';
    import ResearchCarousel from 'components/ResearchCarousel.svelte';
    import Seo from 'components/Seo.svelte';
    import { organizePeople } from 'utils/people.js';

    const news = home.news.map(item => ({
        ...item,
        datetime: item.date.replace('.', '-')
    }));
    const publicationCount = Object.values(publication)
        .reduce((count, papers) => count + papers.length, 0);
    const peopleView = organizePeople(people);
    const particlePeople = [...peopleView.active, ...peopleView.alumni]
        .map(person => person.name);

    let scrollY = $state(0);
    let homeOpacity = $derived(Math.min(1, Math.max(0, (scrollY - 32) / 260)));
    let heroShift = $derived(Math.min(scrollY * .16, 90));
</script>

<svelte:window bind:scrollY />

<Seo
    title="SIML — Statistical Inference and Machine Learning"
    description="SIML at KAIST develops principled machine learning methods grounded in statistical inference."
    path="/"
/>

<Header homeOpacity={homeOpacity} />

<main id="main-content" tabindex="-1">
    <HomeHero
        {news}
        {publicationCount}
        memberCount={peopleView.active.length}
        alumniCount={peopleView.alumni.length}
        people={particlePeople}
        shift={heroShift}
    />
    <ResearchCarousel areas={home.research} />
    <JoinLab content={home.join} />
</main>

<Footer />

<style>
    main { display: block; padding: 0; }
</style>
