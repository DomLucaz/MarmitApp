<h1>MarmitApp</h1>

<p>
  Refeições acessíveis que evitam desperdício de alimentos.<br>
  Front-end em <strong>React</strong> (Vite + MUI) e back-end em <strong>Spring Boot</strong> com <strong>MySQL</strong>.
</p>

<p>
  <strong>Status:</strong> em desenvolvimento<br>
  <strong>Demo local:</strong> <a href="http://localhost:5173" target="_blank" rel="noopener">http://localhost:5173</a>
</p>

<h2>✨ Funcionalidades</h2>
<ul>
  <li>Página Home com navegação</li>
  <li>Listagem e cadastro de <strong>marmitas</strong></li>
  <li>Registro e login de usuário (payload simples)</li>
  <li>Integração com <strong>MySQL</strong> (Docker)</li>
  <li>UI com <strong>Material UI</strong> (tema vermelho)</li>
</ul>

<h3>Rotas do Front-end</h3>
<ul>
  <li><code>/</code> – Home</li>
  <li><code>/marmitas</code> – Lista + cadastro</li>
  <li><code>/login</code> – Autenticação</li>
  <li><code>/register</code> – Cadastro de usuário</li>
</ul>

<h3>Endpoints do Back-end (REST)</h3>
<ul>
  <li><code>GET /produtos</code> — lista de marmitas</li>
  <li><code>POST /produtos</code> — cria marmita <code>{ nome, preco?, estoque? }</code></li>
  <li><code>POST /auth/register</code> — <code>{ nome, email, senha }</code></li>
  <li><code>POST /auth/login</code> — <code>{ email, senha }</code></li>
</ul>

<h2>🧱 Stack</h2>
<ul>
  <li><strong>Front:</strong> React (Vite) • Material UI • Axios</li>
  <li><strong>Back:</strong> Spring Boot 3 • Spring Web • Spring Data JPA</li>
  <li><strong>DB:</strong> MySQL 8 (Docker) • HikariCP</li>
  <li><strong>Build:</strong> Maven</li>
  <li><strong>Dev tools:</strong> Postman • VS Code • Git/GitHub</li>
</ul>
