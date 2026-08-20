<footer>
    <div class="footer-inner">
        <div class="footer-brand">
            <a class="wordmark" href="/">SIML</a>
            <p>Statistical Inference<br />and Machine Learning</p>
        </div>

        <div class="footer-block">
            <span>Visit</span>
            <a href="https://maps.app.goo.gl/pUsxLKwNetAkt3pg8" target="_blank" rel="noreferrer">
                Seoul AI Hub, 5th Floor<br />Seoul, Republic of Korea <i aria-hidden="true">↗</i>
            </a>
        </div>

        <div class="footer-block footer-links">
            <span>Explore</span>
            <a href="/publication/">Publications</a>
            <a href="/people/">People</a>
            <a href="https://gsai.kaist.ac.kr" target="_blank" rel="noreferrer">KAIST AI ↗</a>
        </div>
    </div>

    <div class="footer-bottom">
        <p>© 2020–present SIML Laboratory</p>
        <p>KAIST Kim Jaechul Graduate School of AI</p>
    </div>
</footer>

<style lang="scss">
    @use "utils/variables" as *;

    footer {
        position: relative;
        padding: clamp(4rem, 8vw, 7rem) 0 2rem;
        overflow: hidden;
        color: $kaist-white;
        background: $black;
    }

    footer::before {
        content: 'SIML';
        position: absolute;
        right: 1.5rem;
        bottom: 1rem;
        color: rgba($kaist-white, .025);
        font-size: clamp(8rem, 20vw, 18rem);
        font-weight: 700;
        letter-spacing: -.075em;
        line-height: .82;
        white-space: nowrap;
        pointer-events: none;
    }

    .footer-inner,
    .footer-bottom {
        position: relative;
        z-index: 1;
        width: min(calc(100% - 3rem), 1280px);
        margin: 0 auto;
    }

    .footer-inner {
        padding-bottom: clamp(4rem, 8vw, 8rem);
        display: grid;
        grid-template-columns: 1.3fr 1fr .55fr;
        gap: 4rem;
    }

    .wordmark {
        display: inline-block;
        color: $kaist-white;
        font-size: clamp(3rem, 5vw, 5rem);
        font-weight: 700;
        letter-spacing: -.065em;
        line-height: 1;
    }

    .wordmark:hover { color: $kaist-light-blue; }

    .footer-brand p {
        margin: 1rem 0 0;
        color: rgba($kaist-white, .72);
        font-size: .78rem;
        line-height: 1.45;
        letter-spacing: .04em;
        text-transform: uppercase;
    }

    .footer-block {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: .7rem;
    }

    .footer-block > span {
        margin-bottom: .4rem;
        color: $kaist-light-blue;
        font-size: .65rem;
        font-weight: 700;
        letter-spacing: .16em;
        text-transform: uppercase;
    }

    .footer-block a {
        color: rgba($kaist-white, .7);
        font-size: .85rem;
        line-height: 1.65;
        transition: color .2s ease;
    }

    .footer-block a:hover { color: $kaist-white; }
    .footer-block i { margin-left: .35rem; color: $kaist-light-blue; font-style: normal; }

    .footer-bottom {
        padding-top: 1.4rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        border-top: 1px solid rgba($kaist-white, .1);
        color: rgba($kaist-white, .68);
        font-size: .68rem;
        letter-spacing: .04em;
    }

    .footer-bottom p { margin: 0; }

    @media (max-width: 720px) {
        .footer-inner,
        .footer-bottom { width: calc(100% - 2rem); }
        .footer-inner { grid-template-columns: 1fr 1fr; gap: 3rem 1.5rem; }
        .footer-brand { grid-column: 1 / -1; }
        .footer-bottom { flex-direction: column; }
    }
</style>
