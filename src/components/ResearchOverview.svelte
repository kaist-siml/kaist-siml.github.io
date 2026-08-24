<script>
    let { kind } = $props();
</script>

<div class="overview" data-overview={kind}>
    {#if kind === 'reliable-foundation-models'}
        <header class="overview-header">
            <p class="overview-question">
                Can foundation models know <strong>what they know</strong>,<br />
                update <strong>what they believe</strong>, and <strong>act on uncertainty</strong>?
            </p>
            <span class="overview-rule" aria-hidden="true"></span>
            <p class="overview-intro">
                We study the statistical foundations of uncertainty in foundation models,<br />
                from calibrated estimation and coherent belief updating to reliable decision making.
            </p>
        </header>

        <div class="overview-grid">
            <article class="overview-topic">
                <header class="topic-heading">
                    <span class="topic-number">1</span>
                    <h4>Where does a model's confidence come from, and when can it be trusted?</h4>
                </header>
                <div class="diagram">
                    <svg viewBox="0 0 420 250" role="img" aria-labelledby="calibration-title">
                        <title id="calibration-title">A model produces confidence scores, which are checked against observed outcomes and calibrated in a feedback loop.</title>
                        <defs>
                            <marker id="calibration-neutral-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="calibration-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                                <path d="m1 1 6 3-6 3" fill="none" stroke="#249064" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/>
                            </marker>
                        </defs>

                        <rect class="visual-card" x="18" y="34" width="104" height="132" rx="13"/>
                        <g class="network-lines">
                            <path d="M44 79 67 59 94 76 89 108 61 119 39 99Z"/>
                            <path d="m44 79 45 29M67 59l-6 60m33-43-55 23M44 79l50-3M61 119l28-11"/>
                        </g>
                        <g class="network-nodes">
                            <circle cx="44" cy="79" r="5"/><circle cx="67" cy="59" r="5"/>
                            <circle cx="94" cy="76" r="5"/><circle cx="89" cy="108" r="5"/>
                            <circle cx="61" cy="119" r="5"/><circle cx="39" cy="99" r="5"/>
                        </g>
                        <text class="card-label" x="70" y="148">Model</text>

                        <path class="flow-arrow muted-line" marker-end="url(#calibration-neutral-arrow)" d="M130 100h22"/>
                        <rect class="visual-card" x="160" y="34" width="104" height="132" rx="13"/>
                        <path class="chart-axis" d="M177 126h70"/>
                        <g class="confidence-bars">
                            <rect x="181" y="60" width="12" height="66" rx="2"/>
                            <rect x="198" y="76" width="12" height="50" rx="2"/>
                            <rect x="215" y="92" width="12" height="34" rx="2"/>
                            <rect x="232" y="108" width="11" height="18" rx="2"/>
                        </g>
                        <text class="card-label" x="212" y="148">Confidence</text>

                        <path class="flow-arrow muted-line" marker-end="url(#calibration-neutral-arrow)" d="M272 100h22"/>
                        <rect class="visual-card" x="302" y="34" width="104" height="132" rx="13"/>
                        <g class="reliability-chart">
                            <path class="chart-axis" d="M321 126V52m0 74h67"/>
                            <path class="ideal-line" d="m324 122 61-64"/>
                            <path class="measured-line" d="M324 122c16-7 28-18 40-29s15-14 21-18"/>
                            <circle cx="328" cy="120" r="3"/><circle cx="347" cy="106" r="3"/>
                            <circle cx="364" cy="93" r="3"/><circle cx="384" cy="75" r="3"/>
                        </g>
                        <text class="card-label" x="354" y="148">Verify</text>

                        <path class="feedback-line calibration-flow solid-flow" marker-end="url(#calibration-arrow)" d="M354 174v24q0 18-18 18h-67"/>
                        <rect class="accent-pill" x="162" y="198" width="100" height="36" rx="18"/>
                        <path class="shield-mark" d="M181 208l8-3 8 3v7c0 7-4 11-8 13-4-2-8-6-8-13Zm4 7 3 3 6-7"/>
                        <text class="pill-label" x="223" y="220">Calibrate</text>
                        <path class="feedback-line calibration-flow solid-flow" marker-end="url(#calibration-arrow)" d="M157 216H70q-18 0-18-18v-27"/>
                    </svg>
                </div>
                <p class="topic-caption">Confidence becomes useful when predicted certainty agrees with what happens in practice.</p>
            </article>

            <article class="overview-topic">
                <header class="topic-heading">
                    <span class="topic-number">2</span>
                    <h4>Can a language model maintain coherent beliefs?</h4>
                </header>
                <div class="diagram">
                    <svg viewBox="0 0 420 250" role="img" aria-labelledby="belief-title">
                        <title id="belief-title">A belief receives evidence, checks whether it is reliable, updates itself when the answer is yes, and discards the evidence when the answer is no.</title>
                        <defs>
                            <marker id="belief-neutral-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="accept-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#249064" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="belief-loop-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#249064" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="reject-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#b76565" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                        </defs>

                        <rect class="visual-card" x="8" y="102" width="88" height="96" rx="11"/>
                        <text class="card-label" x="52" y="122">Belief</text>
                        <g class="belief-bars prior-bars"><rect x="23" y="140" width="12" height="28" rx="2"/><rect x="46" y="135" width="12" height="33" rx="2"/><rect x="69" y="135" width="12" height="33" rx="2"/></g>
                        <path class="chart-axis" d="M18 168h68"/>
                        <text class="percentage-label" x="29" y="186">30%</text><text class="percentage-label" x="52" y="186">35%</text><text class="percentage-label" x="75" y="186">35%</text>

                        <path class="flow-arrow muted-line" marker-end="url(#belief-neutral-arrow)" d="M104 150h22"/>
                        <rect class="evidence-card" x="134" y="102" width="88" height="96" rx="11"/>
                        <g class="mini-bars"><rect x="160" y="156" width="7" height="24"/><rect x="171" y="134" width="7" height="46"/><rect x="182" y="146" width="7" height="34"/></g>
                        <path class="chart-axis" d="M156 181h44"/>
                        <text class="card-label" x="178" y="122">Evidence</text>

                        <text class="yes-label branch-label" x="272" y="108">reliable</text>
                        <path class="yes-branch" marker-end="url(#accept-arrow)" d="M230 118h84"/>
                        <rect class="update-card-flow compact-outcome" x="322" y="90" width="88" height="56" rx="10"/>
                        <g class="update-icon compact-update-icon">
                            <path d="M334 117a8 8 0 0 1 13-5l3 3"/><path d="M350 109v6h-6"/>
                            <path d="M350 119a8 8 0 0 1-13 5l-3-3"/><path d="M334 127v-6h6"/>
                        </g>
                        <text class="card-label" x="380" y="121">Update</text>
                        <path class="belief-update-loop" marker-end="url(#belief-loop-arrow)" d="M366 90V50q0-14-14-14H66q-14 0-14 14v46"/>

                        <text class="no-label branch-label" x="272" y="172">not reliable</text>
                        <path class="no-branch solid-flow" marker-end="url(#reject-arrow)" d="M230 182h84"/>
                        <rect class="discard-card-flow compact-outcome" x="322" y="154" width="88" height="56" rx="10"/>
                        <g class="trash-icon flow-trash compact-trash-icon">
                            <path class="trash-body" d="M334 174h16l-1.5 16q-.3 2-2.5 2h-8q-2.5 0-2.8-2Z"/>
                            <path d="M332 171h20M338 168h8M338 177v11m4-11v11m4-11v11"/>
                        </g>
                        <text class="card-label discard-label" x="380" y="185">Discard</text>
                    </svg>
                </div>
                <p class="topic-caption">Reliable evidence should update a belief; misleading evidence should not.</p>
            </article>

            <article class="overview-topic">
                <header class="topic-heading">
                    <span class="topic-number">3</span>
                    <h4>How can what a model knows govern what it does?</h4>
                </header>
                <div class="diagram">
                    <svg viewBox="0 0 420 250" role="img" aria-labelledby="decision-title">
                        <title id="decision-title">A model estimates uncertainty, uses it to answer, check evidence, or defer, and feeds the outcome back to the model.</title>
                        <defs>
                            <marker id="decision-neutral-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="decision-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                                <path d="m1 1 6 3-6 3" fill="none" stroke="#249064" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/>
                            </marker>
                        </defs>

                        <rect class="visual-card" x="10" y="68" width="72" height="112" rx="12"/>
                        <g class="network-lines">
                            <path d="M29 103 45 87 64 99 62 125 43 137 26 121Z"/>
                            <path d="m29 103 33 22M45 87l-2 50m21-38-38 22M29 103l35-4M43 137l19-12"/>
                        </g>
                        <g class="network-nodes">
                            <circle cx="29" cy="103" r="4"/><circle cx="45" cy="87" r="4"/><circle cx="64" cy="99" r="4"/>
                            <circle cx="62" cy="125" r="4"/><circle cx="43" cy="137" r="4"/><circle cx="26" cy="121" r="4"/>
                        </g>
                        <text class="card-label" x="46" y="162">Model</text>

                        <path class="flow-arrow muted-line" marker-end="url(#decision-neutral-arrow)" d="M90 121h22"/>
                        <rect class="visual-card" x="120" y="38" width="92" height="166" rx="12"/>
                        <text class="card-label" x="166" y="61">Uncertainty</text>
                        <path class="belief-area" d="M128 129c15-1 19-52 38-53s23 52 38 53Z"/>
                        <path class="chart-axis" d="M127 129h78M166 77v52"/>
                        <path class="gauge-track" d="M131 158h70"/><path class="gauge-fill" d="M131 158h56"/>
                        <circle class="gauge-knob" cx="187" cy="158" r="8"/>
                        <rect class="score-pill" x="142" y="174" width="48" height="22" rx="11"/>
                        <text class="score-label" x="166" y="189">HIGH</text>

                        <path class="flow-arrow muted-line" marker-end="url(#decision-neutral-arrow)" d="M220 61h22"/>
                        <path class="flow-arrow muted-line" marker-end="url(#decision-neutral-arrow)" d="M220 121h22"/>
                        <path class="flow-arrow muted-line" marker-end="url(#decision-neutral-arrow)" d="M220 181h22"/>
                        <text class="section-label" x="302" y="24">ACTION POLICY</text>
                        <g class="action-options">
                            <rect x="250" y="38" width="104" height="46" rx="10"/>
                            <rect x="250" y="98" width="104" height="46" rx="10"/>
                            <rect class="selected-action" x="250" y="158" width="104" height="46" rx="10"/>
                        </g>
                        <circle class="action-icon" cx="270" cy="61" r="11"/><path class="message-mark" d="M264 56h13v9h-7l-5 4v-4h-1Z"/>
                        <text class="action-label" x="318" y="59">Answer</text><text class="action-hint" x="318" y="73">low uncertainty</text>
                        <circle class="action-icon" cx="270" cy="121" r="11"/><circle class="search-mark" cx="268" cy="119" r="5"/><path class="search-mark" d="m272 123 5 5"/>
                        <text class="action-label" x="318" y="119">Check</text><text class="action-hint" x="318" y="133">gather evidence</text>
                        <circle class="selected-icon" cx="270" cy="181" r="11"/><circle class="person-mark" cx="270" cy="178" r="3"/><path class="person-mark" d="M264 188c1-5 11-5 12 0"/>
                        <text class="selected-label" x="318" y="179">Defer</text><text class="selected-hint" x="318" y="193">ask back</text>

                        <path class="success-line" d="M362 181h15"/>
                        <circle class="success-node" cx="395" cy="181" r="13"/><path class="success-mark" d="m388 181 5 5 9-11"/>
                        <path class="feedback-line success-feedback solid-flow" marker-end="url(#decision-arrow)" d="M395 199v13q0 18-18 18H64q-18 0-18-18v-26"/>
                    </svg>
                </div>
                <p class="topic-caption">Well-calibrated uncertainty lets a system choose, defer, or ask for help.</p>
            </article>
        </div>
    {:else if kind === 'agentic-self-improving-ai'}
        <header class="overview-header">
            <p class="overview-question">
                Can an agent be optimal <strong>without a world model</strong>, keep improving<br />
                <strong>without collapsing</strong>, and specialize <strong>without domain data</strong>?
            </p>
            <span class="overview-rule" aria-hidden="true"></span>
            <p class="overview-intro">
                We study agents that decide, self-improve, and adapt,<br />
                from universal model-free optimality to stable self-play and projection-based domain adaptation.
            </p>
        </header>

        <div class="overview-grid">
            <article class="overview-topic">
                <header class="topic-heading">
                    <span class="topic-number">1</span>
                    <h4>Must an optimal agent model its world?</h4>
                </header>
                <div class="diagram">
                    <svg viewBox="0 0 420 280" role="img" aria-labelledby="universal-title">
                        <title id="universal-title">Model-based universal agents mix environment models and perform expectimax planning. A model-free universal agent instead mixes action-value functions and acts greedily from their values.</title>
                        <defs>
                            <marker id="universal-flow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="universal-muted-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                        </defs>

                        <text class="lane-heading muted-heading" x="10" y="20">AIXI &amp; PRIOR UNIVERSAL AGENTS · MODEL-BASED</text>
                        <g class="model-stack muted-stack">
                            <rect x="10" y="42" width="74" height="56" rx="9"/><rect x="15" y="37" width="74" height="56" rx="9"/><rect x="20" y="32" width="74" height="56" rx="9"/>
                        </g>
                        <text class="card-label" x="57" y="57">Environment</text><text class="card-label" x="57" y="72">models</text>
                        <path class="flow-arrow muted-line" marker-end="url(#universal-muted-arrow)" d="M99 61h14"/>
                        <rect class="inference-card muted-card" x="119" y="36" width="82" height="52" rx="9"/>
                        <text class="card-label" x="160" y="58">Bayes</text><text class="card-label" x="160" y="72">mixture</text>
                        <path class="flow-arrow muted-line" marker-end="url(#universal-muted-arrow)" d="M206 61h14"/>
                        <g class="planning-tree muted-line">
                            <path d="M230 61h17m0 0 25-19m-25 19h25m-25 0 25 19m0-38 28-12m-28 12 28 10m-28 9h28m-28 19 28-10m-28 10 28 12"/>
                            <circle cx="230" cy="61" r="3"/><circle cx="247" cy="61" r="3"/><circle cx="272" cy="42" r="3"/><circle cx="272" cy="61" r="3"/><circle cx="272" cy="80" r="3"/>
                            <circle cx="300" cy="30" r="3"/><circle cx="300" cy="52" r="3"/><circle cx="300" cy="61" r="3"/><circle cx="300" cy="70" r="3"/><circle cx="300" cy="92" r="3"/>
                        </g>
                        <text class="process-caption muted-label" x="265" y="103">expectimax planning</text>
                        <path class="flow-arrow muted-line" marker-end="url(#universal-muted-arrow)" d="M309 61h14"/>
                        <rect class="inference-card muted-card" x="329" y="36" width="72" height="52" rx="9"/>
                        <text class="card-label" x="365" y="57">Act by</text><text class="card-label" x="365" y="71">planning</text>
                        <text class="side-note" x="365" y="103">explicit model required</text>

                        <path class="lane-divider full-divider" d="M10 126h400"/>
                        <text class="lane-heading" x="10" y="151">AIQI · MODEL-FREE UNIVERSAL AGENT</text>
                        <g class="model-stack blue-stack">
                            <rect x="10" y="176" width="78" height="59" rx="9"/><rect x="15" y="171" width="78" height="59" rx="9"/><rect x="20" y="166" width="78" height="59" rx="9"/>
                        </g>
                        <text class="card-label" x="59" y="191">Action-value</text><text class="card-label" x="59" y="207">functions</text>
                        <path class="flow-arrow" marker-end="url(#universal-flow-arrow)" d="M103 196h14"/>
                        <rect class="inference-card blue-card" x="122" y="168" width="82" height="57" rx="9"/>
                        <text class="card-label" x="163" y="185">Universal</text><text class="card-label" x="163" y="198">mixture</text><text class="symbol-label" x="163" y="214">Q-induction</text>
                        <path class="flow-arrow" marker-end="url(#universal-flow-arrow)" d="M209 196h14"/>
                        <g class="value-bars"><rect x="234" y="194" width="9" height="32" rx="2"/><rect x="248" y="175" width="9" height="51" rx="2"/><rect class="best-value" x="262" y="164" width="9" height="62" rx="2"/><rect x="276" y="187" width="9" height="39" rx="2"/><rect x="290" y="207" width="9" height="19" rx="2"/></g>
                        <path class="chart-axis" d="M230 227h70"/>
                        <text class="process-caption" x="265" y="242">distributional Q(h, a)</text>
                        <path class="flow-arrow" marker-end="url(#universal-flow-arrow)" d="M309 196h14"/>
                        <rect class="inference-card success-card" x="329" y="168" width="72" height="57" rx="9"/>
                        <text class="card-label success-card-label" x="365" y="191">Act greedily</text><text class="symbol-label success-card-note" x="365" y="208">argmax Q</text>
                        <text class="success-caption" x="365" y="242">ε-optimal · no model</text>
                    </svg>
                </div>
                <p class="topic-caption">Universal induction can operate over action-value functions instead of environment models.</p>
            </article>

            <article class="overview-topic">
                <header class="topic-heading">
                    <span class="topic-number">2</span>
                    <h4>How does self-play avoid iteration-collapse?</h4>
                </header>
                <div class="diagram">
                    <svg viewBox="0 0 420 280" role="img" aria-labelledby="self-play-title">
                        <title id="self-play-title">The proposer, solver, and verifier form a self-play loop. A one-class model of past tasks separately rewards proposals outside the familiar task region, preserving diversity and continued improvement.</title>
                        <defs>
                            <marker id="self-play-return" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="task-space-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="novelty-return" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#249064" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                        </defs>

                        <rect class="agent-node" x="10" y="36" width="104" height="48" rx="10"/>
                        <text class="card-label" x="62" y="57">Proposer</text><text class="symbol-label" x="62" y="72">poses tasks</text>
                        <path class="flow-arrow" marker-end="url(#task-space-arrow)" d="M120 60h30"/><text class="edge-label" x="135" y="50">task</text>
                        <rect class="agent-node" x="158" y="36" width="104" height="48" rx="10"/>
                        <text class="card-label" x="210" y="57">Solver</text><text class="symbol-label" x="210" y="72">answers</text>
                        <path class="flow-arrow muted-line" marker-end="url(#self-play-return)" d="M268 60h30"/><text class="edge-label" x="283" y="50">answer</text>
                        <rect class="verifier-node" x="306" y="36" width="104" height="48" rx="10"/>
                        <text class="card-label" x="358" y="57">Verifier</text><text class="symbol-label" x="358" y="72">task reward</text>
                        <path class="policy-return" marker-end="url(#self-play-return)" d="M358 92v24H62V90"/>
                        <text class="collapse-note" x="210" y="110">policy update alone narrows each iteration</text>

                        <rect class="memory-node" x="10" y="150" width="104" height="66" rx="10"/>
                        <text class="card-label" x="62" y="172">Past tasks</text><text class="symbol-label" x="62" y="186">iterations 1 … t−1</text>
                        <g class="memory-dots"><circle class="task-dot-1" cx="36" cy="204" r="3"/><circle class="task-dot-2" cx="49" cy="204" r="3"/><circle class="task-dot-3" cx="62" cy="204" r="3"/><circle class="task-dot-4" cx="75" cy="204" r="3"/><circle class="task-dot-5" cx="88" cy="204" r="3"/></g>
                        <path class="flow-arrow lower-connector" marker-end="url(#task-space-arrow)" d="M120 183h180"/>
                        <rect class="novelty-node" x="140" y="140" width="140" height="88" rx="11"/>
                        <text class="card-label" x="210" y="160">Task space</text>
                        <ellipse class="novelty-boundary" cx="197" cy="191" rx="44" ry="25"/>
                        <g class="known-dots"><circle class="task-dot-1" cx="171" cy="186" r="4"/><circle class="task-dot-2" cx="185" cy="198" r="4"/><circle class="task-dot-3" cx="198" cy="177" r="4"/><circle class="task-dot-4" cx="212" cy="196" r="4"/><circle class="task-dot-5" cx="225" cy="185" r="4"/></g>
                        <circle class="novel-dot" cx="262" cy="185" r="6"/>
                        <text class="novel-label" x="262" y="205">novel</text>
                        <rect class="bonus-node" x="306" y="154" width="104" height="62" rx="10"/>
                        <text class="bonus-label" x="358" y="179">Novelty reward</text><text class="symbol-label" x="358" y="197">high outside boundary</text>
                        <path class="novelty-return" marker-end="url(#novelty-return)" d="M358 149V132H82V90"/>

                    </svg>
                </div>
                <p class="topic-caption">Novelty is scored from earlier iterations, then paid back to the proposer.</p>
            </article>

            <article class="overview-topic">
                <header class="topic-heading">
                    <span class="topic-number">3</span>
                    <h4>Can unrelated data teach a domain?</h4>
                </header>
                <div class="diagram">
                    <svg viewBox="0 0 420 280" role="img" aria-labelledby="domain-title">
                        <title id="domain-title">A few examples define a domain profile. That profile guides a frozen prompt writer applied to unrelated general text, producing a Synth-Guide that is projected into synthetic data.</title>
                        <defs>
                            <marker id="profile-guide-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#249064" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="domain-flow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="domain-muted-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                        </defs>

                        <g class="document-stack domain-doc"><rect x="37" y="6" width="50" height="36" rx="7"/><rect class="front-domain-document" x="30" y="13" width="50" height="36" rx="7"/></g>
                        <path class="document-lines domain-document-lines" d="M41 24h28m-28 8h23m-23 8h18"/>
                        <text class="source-label" x="62" y="62">Domain examples</text>
                        <path class="domain-flow" marker-end="url(#domain-flow-arrow)" d="M62 70v10"/>
                        <rect class="profile-node aligned-node" x="10" y="86" width="104" height="54" rx="10"/>
                        <text class="card-label" x="62" y="108">Domain profile η</text><text class="symbol-label" x="62" y="126">format · style · constraints</text>

                        <g class="document-stack general-doc-stack"><rect x="179" y="6" width="50" height="36" rx="7"/><rect class="front-general-document" x="172" y="13" width="50" height="36" rx="7"/></g>
                        <path class="document-lines muted-line" d="M183 24h28m-28 8h23m-23 8h18"/>
                        <text class="source-label" x="204" y="62">General corpus</text>
                        <path class="domain-flow muted-domain-flow" marker-end="url(#domain-muted-arrow)" d="M204 70v10"/>
                        <rect class="writer-node aligned-node" x="152" y="86" width="104" height="54" rx="10"/>
                        <text class="card-label" x="204" y="108">Prompt Writer</text><text class="symbol-label" x="204" y="126">frozen LLM</text>

                        <text class="guidance-label" x="133" y="104">guides</text>
                        <path class="profile-guidance direct-guidance" marker-end="url(#profile-guide-arrow)" d="M122 113h23"/>
                        <path class="domain-flow" marker-end="url(#domain-flow-arrow)" d="M204 149v10"/>
                        <rect class="guide-node aligned-node" x="152" y="166" width="104" height="52" rx="10"/>
                        <text class="card-label" x="204" y="187">Synth-Guide τ</text>
                        <path class="document-lines guide-lines" d="M174 200h60m-60 8h45"/>

                        <path class="project-line direct-project" marker-end="url(#domain-flow-arrow)" d="M264 192h23"/>
                        <rect class="project-node aligned-node" x="294" y="166" width="104" height="52" rx="10"/>
                        <text class="card-label" x="346" y="188">Project τ into the</text><text class="card-label" x="346" y="203">domain's format</text>
                        <path class="domain-flow" marker-end="url(#domain-flow-arrow)" d="M346 225v10"/>
                        <rect class="synthetic-node terminal-node aligned-node" x="294" y="242" width="104" height="34" rx="10"/>
                        <text class="card-label terminal-label" x="346" y="263">Synthetic data</text>

                    </svg>
                </div>
                <p class="topic-caption">A compact domain profile guides unrelated text into realistic synthetic data.</p>
            </article>
        </div>
    {:else if kind === 'ai-weather-forecasting'}
        <header class="overview-header">
            <p class="overview-question">
                How can we make <strong>reliable weather forecasts</strong><br />
                in an inherently <strong>stochastic and uncertain world</strong>?
            </p>
            <span class="overview-rule" aria-hidden="true"></span>
            <p class="overview-intro">
                We study reliable AI weather forecasting by explicitly accounting for uncertainty,<br />
                adapting global forecasting systems to regional needs, and enforcing physical consistency.
            </p>
            <p class="overview-collaboration">In collaboration with <strong>National Institute of Meteorological Sciences (NIMS), Korea</strong></p>
        </header>

        <div class="overview-grid">
            <article class="overview-topic">
                <header class="topic-heading">
                    <span class="topic-number">1</span>
                    <h4>How can ensembles capture uncertainty in the evolution of weather?</h4>
                </header>
                <div class="diagram">
                    <svg viewBox="0 0 420 250" role="img" aria-labelledby="ensemble-title">
                        <title id="ensemble-title">A shared initial weather state evolves into an ensemble of increasingly separated forecast trajectories, representing uncertainty over the forecast horizon.</title>
                        <defs>
                            <marker id="forecast-horizon-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                        </defs>
                        <path class="ensemble-fan" d="M42 148C130 145 222 75 350 58L350 178C222 171 130 151 42 148Z"/>
                        <g class="ensemble-trajectories">
                            <path d="M42 148C132 146 220 82 350 58"/>
                            <path d="M42 148C132 146 226 101 350 84"/>
                            <path d="M42 148C135 148 230 124 350 113"/>
                            <path class="central-trajectory" d="M42 148C142 149 235 148 350 143"/>
                            <path d="M42 148C132 151 228 166 350 178"/>
                        </g>
                        <g class="trajectory-points">
                            <circle class="initial-point" cx="42" cy="148" r="7"/>
                            <circle cx="350" cy="58" r="4"/><circle cx="350" cy="84" r="4"/>
                            <circle cx="350" cy="113" r="4"/><circle cx="350" cy="143" r="4"/><circle cx="350" cy="178" r="4"/>
                        </g>
                        <path class="spread-bracket" d="M372 58h-8v120h8"/>
                        <text class="weather-annotation" x="368" y="44">ensemble spread</text>
                        <path class="weather-horizon-axis" marker-end="url(#forecast-horizon-arrow)" d="M42 191h322"/>
                        <text class="weather-secondary" x="203" y="216">forecast horizon</text>
                    </svg>
                </div>
                <p class="topic-caption">An ensemble represents multiple plausible evolutions instead of one deterministic future.</p>
            </article>

            <article class="overview-topic">
                <header class="topic-heading">
                    <span class="topic-number">2</span>
                    <h4>How can global models be adapted for accurate regional prediction?</h4>
                </header>
                <div class="diagram">
                    <svg viewBox="0 0 420 250" role="img" aria-labelledby="regional-title">
                        <title id="regional-title">A global weather model is transformed through regional adaptation to preserve broad atmospheric structure while resolving local patterns.</title>
                        <rect class="visual-card weather-model-card" x="18" y="40" width="150" height="170" rx="12"/>
                        <circle class="globe" cx="93" cy="108" r="44"/>
                        <ellipse class="globe-grid" cx="93" cy="108" rx="20" ry="44"/>
                        <path class="globe-grid" d="M49 108h88M55 88h76M55 128h76M93 64v88"/>
                        <path class="land-mass" d="M63 77c10-13 25-13 34-2 5 7-2 13-10 18-5 4-7 13-14 14-7 1-11-5-9-12 2-6-7-10-1-18Zm43 31c12-8 25-4 27 6 2 8-8 9-11 16-3 8-7 18-16 17-8-1-9-11-5-18 4-8-3-14 5-21Z"/>
                        <rect class="zoom-source" x="118" y="96" width="20" height="20" rx="2"/>
                        <text class="card-label" x="93" y="177">Global model</text>
                        <text class="symbol-label" x="93" y="194">global forecast</text>

                        <g class="zoom-connector"><path d="M138 96 252 68"/><path d="M138 116 252 158"/></g>

                        <rect class="visual-card weather-model-card" x="252" y="40" width="150" height="170" rx="12"/>
                        <g class="regional-streams">
                            <path d="M270 83c25-18 50-19 73-4 15 9 28 8 42-2"/>
                            <path d="M270 106c30-17 49-13 68-1 17 11 32 10 47-1"/>
                            <path d="M270 130c29-16 53-13 71-2 17 10 29 8 44-2"/>
                        </g>
                        <ellipse class="regional-focus" cx="331" cy="108" rx="42" ry="48"/>
                        <path class="regional-core" d="M334 76c17 7 20 20 11 31-8 10-5 20-12 29-8 9-20 0-18-12 2-10 11-18 9-28-2-8 2-17 10-20Z"/>
                        <text class="card-label" x="327" y="177">Regional adaptation</text>
                        <text class="symbol-label" x="327" y="194">local structure</text>
                    </svg>
                </div>
                <p class="topic-caption">Regional adaptation retains global context while resolving local atmospheric structure.</p>
            </article>

            <article class="overview-topic">
                <header class="topic-heading">
                    <span class="topic-number">3</span>
                    <h4>How can physical consistency make AI weather forecasts more reliable?</h4>
                </header>
                <div class="diagram">
                    <svg viewBox="0 0 420 250" role="img" aria-labelledby="physics-title">
                        <title id="physics-title">Forecast fields pass through physical constraints that conserve mass and energy, producing a physically consistent weather forecast.</title>
                        <defs>
                            <marker id="physics-flow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#7c7c7c" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="forecast-vector-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#1487c8" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                            <marker id="consistent-vector-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 6 3-6 3" fill="none" stroke="#249064" stroke-width="1.333333" stroke-linecap="round" stroke-linejoin="round"/></marker>
                        </defs>
                        <rect class="visual-card weather-field-card" x="10" y="50" width="110" height="150" rx="12"/>
                        <g class="forecast-fields">
                            <path d="M27 82Q36 74 46 73Q75 70 103 84"/>
                            <path d="M27 111Q36 104 46 104Q75 101 103 114"/>
                            <path d="M27 141Q36 134 46 133Q75 130 103 145"/>
                        </g>
                        <g class="field-vectors">
                            <path marker-end="url(#forecast-vector-arrow)" d="M46 73l15 10"/>
                            <path marker-end="url(#forecast-vector-arrow)" d="M46 104l15-10"/>
                            <path marker-end="url(#forecast-vector-arrow)" d="M46 133l15 10"/>
                        </g>
                        <text class="card-label" x="65" y="177">Raw fields</text>
                        <text class="symbol-label" x="65" y="193">implausible</text>
                        <path class="flow-arrow" marker-end="url(#physics-flow-arrow)" d="M128 125h29"/>

                        <circle class="physics-node" cx="210" cy="125" r="43"/>
                        <text class="card-label" x="210" y="120">Physical laws</text>
                        <text class="symbol-label" x="210" y="141">mass · energy</text>
                        <path class="flow-arrow" marker-end="url(#physics-flow-arrow)" d="M261 125h29"/>

                        <rect class="consistent-weather-card" x="300" y="50" width="110" height="150" rx="12"/>
                        <g class="consistent-fields">
                            <path d="M317 91Q330 82 340 84"/><path d="M362 88Q373 90 393 92"/>
                            <path d="M317 121Q330 112 340 114"/><path d="M362 118Q373 120 393 122"/>
                            <path d="M317 151Q330 142 340 144"/><path d="M362 148Q373 150 393 152"/>
                        </g>
                        <g class="consistent-tangent-arrows">
                            <path marker-end="url(#consistent-vector-arrow)" d="M340 84Q351 86 362 88"/>
                            <path marker-end="url(#consistent-vector-arrow)" d="M340 114Q351 116 362 118"/>
                            <path marker-end="url(#consistent-vector-arrow)" d="M340 144Q351 146 362 148"/>
                        </g>
                        <circle class="weather-check" cx="385" cy="72" r="14"/><path class="weather-check-mark" d="m378 72 5 5 10-12"/>
                        <text class="card-label consistent-label" x="355" y="177">Consistent fields</text>
                        <text class="symbol-label consistent-note" x="355" y="193">reliable</text>
                    </svg>
                </div>
                <p class="topic-caption">Physical constraints conserve key quantities and rule out implausible predictions.</p>
            </article>
        </div>
    {/if}
</div>

<style lang="scss">
    @use "utils/variables" as *;

    .overview {
        padding: clamp(2.75rem, 6vw, 5rem) clamp(1rem, 3.5vw, 3rem) clamp(2rem, 4vw, 3.25rem);
        color: $black;
        background: radial-gradient(circle at 50% 0, rgba($kaist-light-blue, .09), transparent 32%), $kaist-white;
    }

    .overview-header { max-width: 1100px; margin: 0 auto; text-align: center; }
    .overview-question { margin: 0; font-size: clamp(1.05rem, 2vw, 1.55rem); font-weight: 700; line-height: 1.38; }
    .overview-question strong { color: $kaist-medium-blue; font-weight: 700; }
    .overview-rule { width: 6rem; height: .3rem; margin: 1.15rem auto; display: block; border-radius: 999px; background: rgba($kaist-dark-gray, .5); }
    .overview-intro { margin: 0; color: rgba($black, .62); font-size: clamp(.88rem, 1.45vw, 1.05rem); font-style: italic; line-height: 1.55; }
    .overview-collaboration { margin: .45rem 0 0; color: $kaist-medium-blue; font-size: clamp(.76rem, 1.1vw, .9rem); }
    .overview-collaboration strong { font-weight: 700; }

    .overview-grid { max-width: 1180px; margin: clamp(2.25rem, 4vw, 3.5rem) auto 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(1rem, 2vw, 1.5rem); }
    .overview-topic { min-width: 0; }
    .topic-heading { min-height: 5.2rem; margin-bottom: .85rem; display: flex; align-items: flex-start; gap: .75rem; }
    .topic-number { width: 2.15rem; height: 2.15rem; flex: 0 0 auto; display: grid; place-items: center; border-radius: 50%; color: $kaist-white; background: $kaist-dark-blue; box-shadow: 0 0 0 4px rgba($kaist-blue, .1); font-size: 1rem; font-weight: 700; }
    .topic-heading h4 { margin: .1rem 0 0; font-size: clamp(.98rem, 1.4vw, 1.15rem); font-weight: 700; letter-spacing: -.025em; line-height: 1.3; }

    .diagram { overflow: hidden; border: 1px solid rgba($kaist-dark-blue, .14); border-radius: .9rem; background: linear-gradient(145deg, rgba(255, 255, 255, .96), rgba($kaist-light-blue, .035)); box-shadow: 0 14px 38px rgba($kaist-dark-blue, .055); }
    .diagram svg { width: 100%; height: auto; display: block; }
    .topic-caption { margin: .8rem .15rem 0; color: rgba($black, .68); font-size: .72rem; font-style: italic; line-height: 1.45; }

    svg text { font-family: Rubik, Arial, sans-serif; }
    svg path, svg rect, svg circle, svg ellipse { vector-effect: non-scaling-stroke; }
    /* markerWidth 6 over an 8-unit viewBox scales strokes by .75; 4/3 keeps heads equal to 1.6px shafts. */
    svg marker path { vector-effect: none; }
    :global(.visual-card), :global(.history-node), :global(.agent-node), :global(.memory-node) { fill: rgba($kaist-white, .94); stroke: rgba($kaist-dark-blue, .2); }
    :global(.visual-card), :global(.evidence-card), :global(.update-card-flow), :global(.discard-card-flow),
    :global(.agent-node), :global(.memory-node), :global(.novelty-node), :global(.verifier-node),
    :global(.bonus-node), :global(.inference-card), :global(.action-options rect) {
        filter: drop-shadow(0 5px 7px rgba($kaist-dark-blue, .065));
    }
    :global(.visual-card), :global(.evidence-card), :global(.update-card-flow), :global(.discard-card-flow),
    :global(.agent-node), :global(.memory-node), :global(.novelty-node), :global(.verifier-node),
    :global(.bonus-node), :global(.inference-card), :global(.action-options rect), :global(.aligned-node) {
        stroke-width: 1.05;
    }
    :global(.card-label), :global(.action-label), :global(.selected-label), :global(.bonus-label),
    :global(.pill-label), :global(.direct-label) {
        font-size: 9.5px;
        font-weight: 700;
        text-anchor: middle;
    }
    :global(.card-label), :global(.action-label) { fill: $kaist-dark-blue; }
    :global(.small-label), :global(.symbol-label), :global(.action-hint), :global(.selected-hint) {
        font-size: 7.5px;
        font-weight: 400;
        text-anchor: middle;
    }
    :global(.small-label), :global(.symbol-label), :global(.action-hint) { fill: rgba($black, .5); }
    :global(.section-label) { fill: $kaist-medium-blue; font-size: 7.5px; font-weight: 700; letter-spacing: .07em; text-anchor: middle; }
    :global(.process-label) { fill: $kaist-medium-blue; font-size: 7px; font-weight: 700; text-anchor: middle; }
    :global(.muted-label) { fill: rgba($black, .48); }
    :global(.node-label) { fill: $kaist-dark-blue; font-size: 7.5px; font-weight: 700; text-anchor: middle; }

    :global(.flow-arrow), :global(.branch-line), :global(.feedback-line), :global(.self-loop), :global(.guide-line), :global(.project-line) { fill: none; stroke: $kaist-dark-gray; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    :global(.lower-connector) { stroke-width: 1.6; }
    :global(.muted-line) { stroke: $kaist-dark-gray; }
    :global(.feedback-line), :global(.self-loop) { stroke-dasharray: 4 4; }
    :global(.calibration-flow) { stroke: #249064; }
    :global(.clear-end) { stroke-dasharray: 5 4; }
    :global(.solid-flow) { stroke-dasharray: none; }
    :global(.chart-axis) { fill: none; stroke: rgba($black, .32); stroke-width: 1; }

    :global(.network-lines) { fill: none; stroke: rgba($kaist-blue, .65); stroke-width: 1.2; }
    :global(.network-nodes circle), :global(.reliability-chart circle) { fill: $kaist-blue; stroke: $kaist-white; stroke-width: 1.2; }
    :global(.confidence-bars rect), :global(.mini-bars rect) { fill: rgba($kaist-blue, .48); }
    :global(.confidence-bars rect:first-child), :global(.mini-bars rect:nth-child(2)) { fill: $kaist-dark-blue; }
    :global(.ideal-line) { fill: none; stroke: rgba($kaist-dark-gray, .55); stroke-dasharray: 4 3; }
    :global(.measured-line) { fill: none; stroke: $kaist-blue; stroke-width: 1.8; }
    :global(.accent-pill) { fill: rgba(36, 144, 100, .08); stroke: rgba(36, 144, 100, .7); }
    :global(.shield-mark) { fill: none; stroke: #249064; stroke-width: 1.5; stroke-linejoin: round; }
    :global(.pill-label) { fill: #1b7653; }

    :global(.belief-area), :global(.posterior-area) { fill: rgba($kaist-light-blue, .14); stroke: $kaist-blue; stroke-width: 1.8; }
    :global(.posterior-area) { fill: rgba($kaist-blue, .1); stroke: $kaist-dark-blue; }
    :global(.axis-dots circle) { fill: rgba($kaist-dark-blue, .35); }
    :global(.belief-bars rect) { fill: rgba($kaist-blue, .5); }
    :global(.prior-bars rect:nth-child(2)) { fill: $kaist-blue; }
    :global(.posterior-bars rect) { fill: rgba($kaist-blue, .28); }
    :global(.posterior-bars .sharp-bar) { fill: $kaist-dark-blue; }
    :global(.percentage-label) { fill: rgba($black, .58); font-size: 7px; font-weight: 600; text-anchor: middle; }
    :global(.strong-percentage) { fill: $kaist-dark-blue; font-weight: 700; }
    :global(.accept-card) { fill: rgba(36, 144, 100, .07); stroke: rgba(36, 144, 100, .6); }
    :global(.accept-dot), :global(.success-node) { fill: rgba(36, 144, 100, .08); stroke: #249064; }
    :global(.accept-mark), :global(.success-mark) { fill: none; stroke: #249064; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
    :global(.accept-path), :global(.success-line), :global(.novelty-loop), :global(.guide-line) { fill: none; stroke: #249064; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    :global(.reject-card) { fill: rgba(183, 101, 101, .045); stroke: rgba(183, 101, 101, .45); }
    :global(.noise-dots circle) { fill: #b76565; }
    :global(.reject-label) { fill: #a85757; }
    :global(.reject-path) { fill: none; stroke: #b76565; stroke-width: 1.6; stroke-dasharray: 4 3; }
    :global(.reject-path.solid-flow) { stroke-dasharray: none; }
    :global(.trash-icon path) { fill: none; stroke: #9b5b5b; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
    :global(.trash-icon .trash-body) { fill: rgba(183, 101, 101, .07); }
    :global(.update-node) { fill: rgba($kaist-light-blue, .1); stroke: rgba($kaist-blue, .7); }
    :global(.update-icon) { fill: none; stroke: $kaist-blue; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
    :global(.posterior-dots .result-dot) { fill: #249064; stroke: rgba(36, 144, 100, .2); stroke-width: 3; }
    :global(.evidence-card) { fill: rgba($kaist-light-blue, .07); stroke: rgba($kaist-blue, .55); }
    :global(.decision-diamond) { fill: rgba($kaist-light-blue, .08); stroke: rgba($kaist-blue, .72); stroke-width: 1.3; }
    :global(.decision-text) { fill: $kaist-dark-blue; font-size: 8.5px; font-weight: 700; text-anchor: middle; }
    :global(.yes-label), :global(.no-label), :global(.edge-label), :global(.guidance-label) {
        font-size: 7.5px;
        font-weight: 700;
        text-anchor: middle;
    }
    :global(.yes-label) { fill: #249064; }
    :global(.no-label) { fill: #a85757; }
    :global(.branch-label) { letter-spacing: 0; }
    :global(.yes-branch), :global(.no-branch) { fill: none; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    :global(.yes-branch) { stroke: #249064; }
    :global(.no-branch) { stroke: #b76565; }
    :global(.belief-update-loop) { fill: none; stroke: #249064; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    :global(.update-card-flow) { fill: rgba(36, 144, 100, .06); stroke: rgba(36, 144, 100, .62); }
    :global(.discard-card-flow) { fill: rgba(183, 101, 101, .05); stroke: rgba(183, 101, 101, .52); }
    :global(.discard-label) { fill: #a85757; }

    :global(.gauge-track), :global(.gauge-fill) { fill: none; stroke-width: 7; stroke-linecap: round; }
    :global(.gauge-track) { stroke: rgba($kaist-dark-gray, .2); }
    :global(.gauge-fill) { stroke: $kaist-blue; }
    :global(.gauge-knob) { fill: $kaist-white; stroke: $kaist-blue; stroke-width: 2; }
    :global(.score-pill) { fill: $kaist-dark-blue; }
    :global(.score-label) { fill: $kaist-white; font-size: 7.5px; font-weight: 700; letter-spacing: .08em; text-anchor: middle; }
    :global(.action-options rect) { fill: rgba($kaist-white, .95); stroke: rgba($kaist-dark-blue, .2); }
    :global(.action-options .selected-action) { fill: rgba(36, 144, 100, .08); stroke: #249064; stroke-width: 1.3; }
    :global(.action-icon) { fill: rgba($kaist-light-blue, .09); stroke: rgba($kaist-blue, .55); }
    :global(.message-mark), :global(.search-mark) { fill: none; stroke: $kaist-medium-blue; stroke-width: 1.3; stroke-linecap: round; stroke-linejoin: round; }
    :global(.selected-icon) { fill: rgba(36, 144, 100, .08); stroke: #249064; }
    :global(.person-mark) { fill: none; stroke: #249064; stroke-width: 1.2; }
    :global(.selected-label) { fill: #1b7653; }
    :global(.selected-hint) { fill: rgba(27, 118, 83, .7); }
    :global(.success-feedback) { stroke: #249064; }

    :global(.stacked-models rect) { fill: rgba($kaist-white, .95); }
    :global(.muted-stack rect) { stroke: rgba($kaist-dark-gray, .45); }
    :global(.blue-stack rect) { fill: rgba($kaist-light-blue, .08); stroke: rgba($kaist-blue, .7); }
    :global(.planning-tree circle) { fill: rgba($kaist-dark-gray, .65); }
    :global(.muted-action) { fill: rgba($kaist-dark-gray, .08); stroke: rgba($kaist-dark-gray, .5); }
    :global(.lane-divider) { stroke: rgba($kaist-dark-blue, .12); stroke-dasharray: 4 4; }
    :global(.value-bars rect) { fill: rgba($kaist-blue, .4); }
    :global(.value-bars .best-value) { fill: $kaist-dark-blue; }
    :global(.direct-action) { fill: $kaist-dark-blue; stroke: $kaist-dark-blue; }
    :global(.direct-label) { fill: $kaist-white; }
    :global(.success-caption) { fill: #249064; font-size: 7px; font-weight: 700; text-anchor: middle; }

    :global(.verifier-node) { fill: rgba($kaist-dark-gray, .05); stroke: rgba($kaist-dark-gray, .5); }
    :global(.novelty-node) { fill: #f7fbfe; stroke: rgba($kaist-dark-blue, .16); }
    :global(.memory-dots .task-dot-1), :global(.known-dots .task-dot-1) { fill: $kaist-dark-blue; }
    :global(.memory-dots .task-dot-2), :global(.known-dots .task-dot-2) { fill: $kaist-blue; }
    :global(.memory-dots .task-dot-3), :global(.known-dots .task-dot-3) { fill: $kaist-light-blue; }
    :global(.memory-dots .task-dot-4), :global(.known-dots .task-dot-4) { fill: $kaist-medium-blue; }
    :global(.memory-dots .task-dot-5), :global(.known-dots .task-dot-5) { fill: $kaist-dark-gray; }
    :global(.novelty-boundary) { fill: rgba($kaist-light-blue, .14); stroke: $kaist-blue; stroke-dasharray: 5 4; }
    :global(.known-dots circle) { stroke: $kaist-white; stroke-width: 1; }
    :global(.novel-dot) { fill: #249064; stroke: $kaist-white; stroke-width: 1.5; }
    :global(.novel-label) { fill: #249064; font-size: 7px; font-weight: 700; text-anchor: middle; }
    :global(.bonus-node) { fill: rgba(36, 144, 100, .08); stroke: rgba(36, 144, 100, .65); }
    :global(.bonus-label) { fill: #1b7653; }
    :global(.novelty-loop) { stroke-dasharray: 5 4; }

    :global(.document-stack rect), :global(.general-doc) { fill: rgba($kaist-dark-gray, .04); stroke: rgba($kaist-dark-gray, .42); }
    :global(.domain-doc rect) { fill: #f4faff; stroke: rgba($kaist-blue, .62); }
    :global(.domain-doc .front-domain-document) { fill: #e8f5fc; stroke: $kaist-blue; }
    :global(.general-doc-stack .front-general-document) { fill: #f1f2f4; stroke: $kaist-dark-gray; }
    :global(.document-lines) { fill: none; stroke: rgba($kaist-dark-blue, .55); stroke-width: 1.2; stroke-linecap: round; }
    :global(.domain-document-lines) { stroke: $kaist-blue; }
    :global(.vertical-arrow) { stroke: $kaist-dark-gray; }
    :global(.domain-flow) { fill: none; stroke: $kaist-dark-gray; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    :global(.muted-domain-flow) { stroke: $kaist-dark-gray; }
    :global(.profile-node), :global(.guide-node), :global(.project-node), :global(.synthetic-node) { fill: rgba($kaist-light-blue, .07); stroke: rgba($kaist-blue, .65); }
    :global(.writer-node) { fill: rgba($kaist-dark-gray, .045); stroke: rgba($kaist-dark-gray, .5); }
    :global(.project-line) { fill: none; stroke: $kaist-dark-gray; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    :global(.direct-project) { stroke-width: 1.6; }
    :global(.terminal-node) { fill: rgba(36, 144, 100, .08); stroke: rgba(36, 144, 100, .72); }
    :global(.terminal-label) { fill: #1b7653; }
    :global(.terminal-note) { fill: rgba(27, 118, 83, .72); }

    :global(.ensemble-fan) { fill: rgba($kaist-light-blue, .12); stroke: none; }
    :global(.ensemble-trajectories path) { fill: none; stroke: rgba($kaist-blue, .52); stroke-width: 1.6; stroke-linecap: round; }
    :global(.ensemble-trajectories .central-trajectory) { stroke: $kaist-dark-blue; }
    :global(.trajectory-points circle) { fill: $kaist-blue; stroke: $kaist-white; stroke-width: 1; }
    :global(.trajectory-points .initial-point) { fill: $kaist-dark-blue; }
    :global(.spread-bracket) { fill: none; stroke: $kaist-dark-blue; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    :global(.weather-horizon-axis) { fill: none; stroke: $kaist-dark-gray; stroke-width: 1.6; stroke-linecap: round; }
    :global(.weather-annotation) { fill: $kaist-dark-blue; font-size: 7.5px; font-weight: 700; text-anchor: middle; }
    :global(.weather-secondary) { fill: rgba($black, .5); font-size: 7px; text-anchor: middle; }
    :global(.weather-model-card), :global(.weather-field-card) { stroke-width: 1.05; }
    :global(.globe) { fill: rgba($kaist-light-blue, .1); stroke: $kaist-blue; stroke-width: 1.5; }
    :global(.globe-grid) { fill: none; stroke: rgba($kaist-blue, .45); stroke-width: 1; }
    :global(.land-mass) { fill: rgba($kaist-blue, .28); stroke: none; }
    :global(.zoom-source) { fill: rgba($kaist-light-blue, .2); stroke: $kaist-dark-blue; stroke-width: 1.4; }
    :global(.zoom-connector path) { fill: none; stroke: rgba($kaist-dark-blue, .5); stroke-width: 1.2; stroke-linecap: round; }
    :global(.regional-streams path), :global(.forecast-fields path), :global(.consistent-fields path),
    :global(.field-vectors path), :global(.consistent-tangent-arrows path) {
        fill: none;
        stroke-width: 1.6;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
    :global(.regional-streams path), :global(.forecast-fields path), :global(.field-vectors path) { stroke: $kaist-blue; }
    :global(.regional-focus) { fill: none; stroke: rgba($kaist-light-blue, .9); stroke-width: 1.2; stroke-dasharray: 4 3; }
    :global(.regional-core) { fill: $kaist-dark-blue; stroke: none; }
    :global(.physics-node) { fill: rgba($kaist-light-blue, .1); stroke: $kaist-blue; stroke-width: 1.5; }
    :global(.consistent-weather-card) { fill: rgba(36, 144, 100, .07); stroke: rgba(36, 144, 100, .72); stroke-width: 1.05; filter: drop-shadow(0 5px 7px rgba($kaist-dark-blue, .065)); }
    :global(.consistent-fields path), :global(.consistent-tangent-arrows path) { stroke: #249064; }
    :global(.weather-check) { fill: #249064; stroke: $kaist-white; stroke-width: 1.5; }
    :global(.weather-check-mark) { fill: none; stroke: $kaist-white; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    :global(.consistent-label) { fill: #1b7653; }
    :global(.consistent-note) { fill: rgba(27, 118, 83, .72); }

    :global(.lane-heading) { fill: $kaist-dark-blue; font-size: 7.5px; font-weight: 700; letter-spacing: .045em; }
    :global(.muted-heading) { fill: rgba($black, .52); }
    :global(.model-stack rect) { fill: rgba($kaist-white, .95); }
    :global(.inference-card) { stroke-width: 1.2; }
    :global(.muted-card) { fill: rgba($kaist-dark-gray, .045); stroke: rgba($kaist-dark-gray, .48); }
    :global(.blue-card) { fill: rgba($kaist-light-blue, .07); stroke: rgba($kaist-blue, .72); }
    :global(.success-card) { fill: rgba(36, 144, 100, .08); stroke: rgba(36, 144, 100, .72); }
    :global(.success-card-label) { fill: #1b7653; }
    :global(.success-card-note) { fill: rgba(27, 118, 83, .72); }
    :global(.process-caption), :global(.side-note) { fill: rgba($black, .48); font-size: 7px; text-anchor: middle; }
    :global(.full-divider) { stroke: rgba($kaist-dark-blue, .14); }
    :global(.universal-result) { text-anchor: end; }

    :global(.edge-label), :global(.collapse-note) { fill: rgba($black, .48); }
    :global(.collapse-note) { font-size: 7px; font-style: italic; text-anchor: middle; }
    :global(.policy-return) { fill: none; stroke: $kaist-dark-gray; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    :global(.novelty-return) { fill: none; stroke: #249064; stroke-width: 1.6; stroke-dasharray: 5 4; stroke-linecap: round; stroke-linejoin: round; }

    :global(.source-label) { fill: $kaist-dark-blue; font-size: 8.5px; font-weight: 700; text-anchor: middle; }
    :global(.source-note) { fill: rgba($black, .5); font-size: 7px; text-anchor: middle; }
    :global(.aligned-node) { filter: drop-shadow(0 5px 7px rgba($kaist-dark-blue, .06)); }
    :global(.profile-guidance) { fill: none; stroke: #249064; stroke-width: 1.6; stroke-dasharray: 4 3; stroke-linecap: round; stroke-linejoin: round; }
    :global(.direct-guidance) { stroke-width: 1.6; stroke-dasharray: none; }
    :global(.guidance-label) { fill: #249064; }

    @media (max-width: 900px) {
        .overview { padding-inline: clamp(1rem, 5vw, 2rem); }
        .overview-grid { max-width: 680px; grid-template-columns: 1fr; gap: 2rem; }
        .topic-heading { min-height: 0; }
        .diagram svg { max-height: 330px; }
        .topic-caption { font-size: .78rem; }
    }

    @media (max-width: 560px) {
        .overview { padding-top: 3.5rem; }
        .overview-question br, .overview-intro br { display: none; }
        .overview-grid { margin-top: 2rem; }
        .topic-heading h4 { font-size: 1rem; }
        .topic-number { width: 2rem; height: 2rem; }
    }
</style>
