<style lang="scss">
    @import "utils/style";

    .content {
        grid-area: content;
        clear: both;
        
        .banner {
            background-image: url("/kaist-gsai-bg.png");
            background-size: cover;
            background-position: top;
            width: 100vw;
            left: 0;
            right: 0;
            position: absolute;
        }

        .banner-dummy {
            height: 28rem;
        }

        .banner h2 {
            margin-top: 10rem;
            font-size: 4rem;
            font-family: Rubik;
            font-weight: 600;
            
            white-space: nowrap;

            text-align: center;
            color: $kaist-white;
            text-shadow: -1px  1px 0 $kaist-dark-blue,
				          1px  1px 0 $kaist-dark-blue,
				          1px -1px 0 $kaist-dark-blue,
				         -1px -1px 0 $kaist-dark-blue;  // text-outline
        }

        .banner h3 {
            margin-bottom: 10rem;
            font-size: 1rem;
            font-family: Rubik;
            font-weight: 600;
            
            white-space: nowrap;

            text-align: center;
            color: $kaist-white;
            text-shadow: -1px  1px 0 $kaist-dark-blue,
				          1px  1px 0 $kaist-dark-blue,
				          1px -1px 0 $kaist-dark-blue,
				         -1px -1px 0 $kaist-dark-blue;  // text-outline
        }
    }

    .content h2 {
        font-size: 1.5rem;
        font-family: Helvetica;
        font-weight: 400;
        color: $kaist-dark-blue;
    }

    .content ul {
        list-style: none;
        padding: 0;
    }

    a {
        @include decorate-a;
        padding: 0px;
        
        &:hover {
            box-shadow: inset 0 -1.5em 0 $kaist-medium-blue;
            color: $kaist-white;
        }
    }

</style>

<svelte:head>
    <title>SIML</title>
</svelte:head>

<main>
    <div class="content">
        <div class="banner">
            <h2>SIML Lab.</h2>
            <h3>Statistical Inference and Machine Learning</h3>
        </div>
        <div class="banner-dummy"></div>
        <h2>Recent news from SIML</h2>
            <ul>
            <li>(2023.01) 5 papers were accepted to ICLR 2023 (including <b>1 spotlight presentation</b>).</li>
            <li>(2022.09) 2 papers were accepted to NeurIPS 2022.</li>
            <li>(2022.05) 2 papers were accepted to ICML 2022.</li>
            <li>(2022.01) 3 papers were accepted to ICLR 2022.</li>
            <li>(2021.09) 2 papers were accepted to NeurIPS 2021.</li>
            <li>(2021.05) 1 paper was accepted to ICML 2021.</li>
            <li>(2020.07) Prof. Juho Lee started directing the SIML Laboratory as an assistant professor at KAIST AI.
            </ul>
        <h2>For prospective students</h2>
            <p>
            We are looking for self-motivated students interested in machine learning, deep learning, and Bayesian methods.
            <a href="https://juho-lee.github.io/" target="_blank">Prof. Juho Lee</a> currently advises students in
            <a href="https://gsai.kaist.ac.kr/" target="_blank">Kim Jaechul Graduate School of AI</a> at KAIST, so please get admission before contacting him.
            It is strongly recommended to contact him in advance (at least two or three months earlier than the graduate school admission deadline)
            and conduct a research project with the professor.
            </p>
    </div>
</main>
