import{_ as s,c as n,o as a,a as l}from"./app.d438add3.js";const u=JSON.parse('{"title":"Columns","description":"","frontmatter":{},"headers":[{"level":2,"title":"Columns with no values","slug":"columns-with-no-values"}],"relativePath":"model-columns/index.md"}'),p={name:"model-columns/index.md"},e=l(`<h1 id="columns" tabindex="-1">Columns <a class="header-anchor" href="#columns" aria-hidden="true">#</a></h1><p>Define a column with a name, and the value as the method to call from <code>Blueprint</code> class instance. Additional arguments for the method can be defined after the colon, and separated by comma.</p><div class="language-yaml line-numbers-mode"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#F07178;">models</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">Post</span><span style="color:#89DDFF;">:</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">claps</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">integer:true,true nullable</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-php line-numbers-mode"><button class="copy"></button><span class="lang">php</span><pre><code><span class="line"><span style="color:#FFCB6B;">Schema</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">create</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">posts</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Blueprint</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">id</span><span style="color:#89DDFF;">();</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">integer</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">claps</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true)-&gt;</span><span style="color:#82AAFF;">nullable</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">timestamps</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">});</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>While the above syntax will work for <a href="./../model#quick-model">Quick Models</a>, you can have total control on the model itself using <a href="./../model#custom-model">Custom Models</a>. For the latter, put your columns and relations inside the <code>columns</code> key.</p><div class="language-yaml line-numbers-mode"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#F07178;">models</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">Post</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">columns</span><span style="color:#89DDFF;">:</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">claps</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">integer:true,true nullable</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-php line-numbers-mode"><button class="copy"></button><span class="lang">php</span><pre><code><span class="line"><span style="color:#FFCB6B;">Schema</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">create</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">posts</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Blueprint</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">integer</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">claps</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true)-&gt;</span><span style="color:#82AAFF;">nullable</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">});</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">I&#39;ll use my own method</p><p>If you have a package adding custom columns types, like <code>$table-&gt;custom(&#39;foo&#39;)</code> or <code>$table-&gt;foo()</code>, no problem, you can type<code>foo: custom</code> or <code>foo: ~</code>, respectively.</p><p>Since there is no method checking, you should be careful of typos, as <code>cool_at: timetsamp</code> will become <code>$table-&gt;timetsamp(&#39;cool_at&#39;)</code>.</p></div><h2 id="columns-with-no-values" tabindex="-1">Columns with no values <a class="header-anchor" href="#columns-with-no-values" aria-hidden="true">#</a></h2><p>Column keys with null values, for both <a href="./../model#quick-model">Quick Models</a> and <a href="./../model#custom-model">Custom Models</a>, will transform into method names with no arguments. This is used for timestamps, soft-deletes and other short-hands from the <a href="https://laravel.com/docs/migrations#columns" target="_blank" rel="noreferrer">Blueprint</a>.</p><div class="language-yaml line-numbers-mode"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#F07178;">models</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">Posts</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">columns</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">uuid</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">softDeletes</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">timestampsTz</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">rememberToken</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">myCustomMethod</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-php line-numbers-mode"><button class="copy"></button><span class="lang">php</span><pre><code><span class="line"><span style="color:#FFCB6B;">Schema</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">create</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">model_name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Blueprint</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">id</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">uuid</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">softDeletes</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">timestampsTz</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">rememberToken</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">table</span><span style="color:#89DDFF;">-&gt;</span><span style="color:#82AAFF;">myCustomMethod</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">});</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">Prefer the wavy thing</p><p>To issue a null value, use <code>~</code>. Some YAML parsers run in circles when a value is empty.</p></div>`,13),o=[e];function c(t,r,D,F,y,i){return a(),n("div",null,o)}const m=s(p,[["render",c]]);export{u as __pageData,m as default};