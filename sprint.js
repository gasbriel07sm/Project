

    function toggleForm(type) {
      const loginForm = document.getElementById("loginForm");
      const registerForm = document.getElementById("registerForm");
      const btnLogin = document.getElementById("btnLogin");
      const btnRegister = document.getElementById("btnRegister");

      if (type === "login") {
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
        btnLogin.classList.add("active");
        btnRegister.classList.remove("active");
      } else {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        btnLogin.classList.remove("active");
        btnRegister.classList.add("active");
      }
    }
    function BuscarAPI() {
      const nome = document.getElementById("caixa-texto-nome").value.trim();
      const idade = document.getElementById("caixa-texto-idade").value.trim();
      const cpf = document.getElementById("caixa-texto").value.trim();
      const email = document.getElementById("caixa-texto-email").value.trim();
      const senha = document.getElementById("caixa-texto-senha").value.trim();

      if (!nome || !idade || !cpf || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      fetch("https://localhost:5501/api/pessoa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          idade: parseInt(idade),
          cpf,
          email,
          senha
        })
      })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            try {
              throw JSON.parse(text);
            } catch {
              throw new Error(text || "Erro desconhecido");
            }
          });
        }
        return res.json();
      })
      .then(data => {
        document.getElementById("resultado").textContent = data.mensagem || "Pessoa cadastrada com sucesso.";

        const divDados = document.getElementById("dados-pessoa");
        divDados.innerHTML = `
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Idade:</strong> ${idade}</p>
            <p><strong>CPF:</strong> ${cpf}</p>
            <p><strong>Email:</strong> ${email}</p>
        `;

        alert(`Validação: ${data.mensagem}`);
      })
      .catch(err => {
        console.error("Erro:", err);
        document.getElementById("resultado").textContent = err.erro || err.message || "Erro ao conectar com a API.";
        alert(err.erro || err.message || "Erro ao conectar com a API.");
      });
    }
    document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const emailLogin = this.querySelector('input[type="email"]').value.trim();
      const senhaLogin = this.querySelector('input[type="password"]').value.trim();

      if (!emailLogin || !senhaLogin) {
        alert("Por favor, preencha email e senha.");
        return;
      }

      fetch("https://localhost:7109/api/pessoa")
        .then(res => {
          if (!res.ok) throw new Error("Erro ao acessar API");
          return res.json();
        })
        .then(users => {
          // users é um array de objetos { nome, idade, cpf, email, senha }
          const user = users.find(u => u.email === emailLogin && u.senha === senhaLogin);

          if (user) {
            alert(`Bem-vindo, ${user.nome}! Login efetuado com sucesso.`);
            // Aqui você pode redirecionar o usuário para outra página, ex:
            // window.location.href = "mural.html";
          } else {
            alert("Email ou senha inválidos.");
          }
        })
        .catch(err => {
          console.error(err);
          alert("Erro ao conectar com a API.");
        });
    });
