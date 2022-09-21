import { useState, useEffect } from "react";
import { Pages } from "./Pages";
import { Panell } from "../styled";
import "../styles/app.css";

export const App = () => {
  const [precioTotal, setprecioTotal] = useState(0);

  useEffect(() => {
    const checkbox = JSON.parse(localStorage.getItem("checkbox"));
    if (checkbox) {
      setCheckbox(checkbox);
    }
  }, []);

  const [checkbox, setCheckbox] = useState({
    web: false,
    seo: false,
    ads: false,
  });

  useEffect(() => {
    localStorage.setItem("checkbox", JSON.stringify(checkbox));
  }, [checkbox]);

  const handleInputChange = ({ target }) => {
    const { checked, value, name } = target;

    if (checked) {
      setprecioTotal(precioTotal + parseInt(value));
      setCheckbox({
        ...checkbox,
        [name]: checked,
      });
    } else {
      setprecioTotal(precioTotal - parseInt(value));
      setCheckbox({
        ...checkbox,
        [name]: checked,
      });
    }
  };

  let checkWebStatus = checkbox.web;

  const [variables, setVariables] = useState({
    pages: 1,
    languages: 1,
  });

  const { pages, languages } = variables;

  const handleVariablesChange = ({ target }) => {
    const { name, value } = target;
    setVariables({
      ...variables,
      [name]: value,
    });
  };

  //******************* VARIABLES BUTTONS *******************

  const handleAddPage = (e) => {
    setVariables({
      ...variables,
      pages: pages + 1,
    });
    e.preventDefault();
  };

  const handleSubstractPage = (e) => {
    if (pages > 1) {
      setVariables({
        ...variables,
        pages: pages - 1,
      });
    }
    e.preventDefault();
  };

  const handleAddLang = (e) => {
    setVariables({
      ...variables,
      languages: languages + 1,
    });
    e.preventDefault();
  };

  const handleSubstractLang = (e) => {
    if (languages > 1) {
      setVariables({
        ...variables,
        languages: languages - 1,
      });
    }
    e.preventDefault();
  };

  let pageVar = pages > 1 ? pages * 30 : 0;
  let langVar = languages > 1 ? languages * 30 : 0;
  let totalVariables = pageVar + langVar;
  let preu = precioTotal + totalVariables;

  // ************************BUDGETS***********************************

  // STATES
  let initialPressupostos = [
    {
      nom: "Test-1",
      client: "Luis Vicente",
      preu: "500",
      data: "21/9/2022/ a les 16:00 h",
    },
    {
      nom: "Test-2",
      client: "Alex Luque",
      preu: "300",
      data: "21/9/2022/ a les 16:00 h",
    },
  ];

  const [budget, setBudget] = useState({
    nom: "",
    client: "",
    preu: 0,
    data: "",
  });

  const [pressupostos, setPressupostos] = useState(initialPressupostos);

  console.log("longitud", pressupostos.length);

  // INPUT CHANGE
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setBudget({
      ...budget,
      [name]: value,
      preu: preu,
      data: data,
    });
  };

  // PRESS BUTTON SAVE
  const onSubmit = (event) => {
    event.preventDefault();
    let newPressupostos = [...pressupostos];
    newPressupostos.push(budget);
    setPressupostos(newPressupostos);
    document.getElementById("input-form").reset();
    document.getElementById("input-opt").reset();
  };
  console.log("longitud post boton", pressupostos.length);

  //******************New Date() Function*******************

  const current = new Date();
  const data = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}/ a les ${current.getHours()}:${current.getMinutes()} h.`;

  return (
    <>
      <div className="cont">
        <div className="cont-izq">
          <form id="input-opt">
            <h2>Què vols fer?</h2>
            <input
              type="checkbox"
              id="check01"
              name="web"
              value="500"
              onChange={handleInputChange}
            />
            Una pàgina web (500 €)
            <Panell isShowed={checkWebStatus}>
              <Pages
                pageValue={pages}
                langValue={languages}
                onChange={handleVariablesChange}
                addPage={handleAddPage}
                subPage={handleSubstractPage}
                addLang={handleAddLang}
                subLang={handleSubstractLang}
              />
            </Panell>
            <br />
            <input
              type="checkbox"
              id="check02"
              name="seo"
              value="300"
              onChange={handleInputChange}
            />
            Una consultoria SEO (300 €)
            <br />
            <input
              type="checkbox"
              id="check03"
              name="ads"
              value="200"
              onChange={handleInputChange}
            />
            Una campanya de Google Ads (200 €)
            <hr />
            <br />
          </form>

          {/* ************** CUSTOMER INPUTS *****************  */}

          <form id="input-form">
            <label>Nom del pressupost: </label>
            <input
              type="text"
              placeholder="Pressupost"
              name="nom"
              onChange={onInputChange}
            />
            <br />
            <label>Nom del client: </label>
            <input
              type="text"
              placeholder="Client"
              name="client"
              onChange={onInputChange}
            />
            <br />
            <br />
            <h4>Preu: {preu} €</h4>
            <br />
            <button type="submit" onClick={onSubmit}>
              Afegir pressupost
            </button>
          </form>
        </div>
        <div className="cont-der">
          <h3>
            <u>Llistat de pressupostos</u>
          </h3>
          <ol>
            {pressupostos.length <= 1 ? (
              <div></div>
            ) : (
              <div>
                {pressupostos.map((item, i) => (
                  <li className="llistat" key={i}>
                    {`Press. ${item.nom}  Client: ${item.client}  Total: ${item.preu} €.  Creat el ${item.data}`}
                    <hr />
                  </li>
                ))}
              </div>
            )}
          </ol>
        </div>
      </div>
    </>
  );
};