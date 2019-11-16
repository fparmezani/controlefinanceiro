import React, { useState, useEffect } from "react";
import "./index.css";

function Controle() {
  const [transacoes, setTransacoes] = useState([]);
  const [produto, setProduto] = useState("");
  const [valor, setValor] = useState(0);
  const [transacao, setTransacao] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    function loadTransacoes() {
      const trans =
        localStorage.getItem("transacoes") !== null
          ? JSON.parse(localStorage.getItem("transacoes"))
          : [];

      setTransacoes(trans);

      setNewValor(trans);
    }

    loadTransacoes();
  }, []);

  async function setNewValor(trans) {
    var novoValor = 0;

    await trans.map(item => {
      if (item.transacao == "1") {
        novoValor += parseInt(item.valor);
      } else {
        novoValor -= parseInt(item.valor);
      }
    });

    setTotal(novoValor);
  }

  function handleSubmit(event) {
    event.preventDefault();

    var trans =
      localStorage.getItem("transacoes") !== null
        ? JSON.parse(localStorage.getItem("transacoes"))
        : [];

    var t = {
      _id:
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      produto: produto,
      valor: parseInt(valor),
      transacao: transacao
    };

    trans.push(t);
    localStorage.setItem("transacoes", JSON.stringify(trans));
    setTransacoes(trans);
    clearForm();
    setNewValor(trans);
  }

  function clearForm() {
    setProduto("");
    setValor(0);
    setTransacao(0);
  }

  return (
    <div className="container">
      <h4>Controle Financeiro</h4>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Tipo de Transação</label>
          <select
            className="form-control"
            id="transacao"
            onChange={event => setTransacao(event.target.value)}
          >
            <option value="">Selecione uma opção</option>
            <option value="1">Compra</option>
            <option value="2">Devolução</option>
          </select>

          <label htmlFor="">Nome da Mercadoria</label>
          <input
            type="text"
            className="form-control"
            id="produto"
            value={produto}
            onChange={event => setProduto(event.target.value)}
          ></input>

          <label htmlFor="valor">Valor</label>
          <input
            type="text"
            className="form-control"
            id="valor"
            value={valor}
            onChange={event => setValor(event.target.value)}
          ></input>

          <button type="submit" className="btn">
            Adicionar transação
          </button>
        </form>
        <div>
          <h4>Extrato de Transações</h4>
          <div>
            <table className="extrato">
              <thead>
                <tr>
                  <th></th>
                  <th className="left">Mercadoria</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map(item => (
                  <tr key={item._id}>
                    <td>{item.transacao === "1" ? "+" : "-"}</td>
                    <td>{item.produto}</td>
                    <td className="right">R$ {item.valor}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td className="right">R$ {total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controle;
