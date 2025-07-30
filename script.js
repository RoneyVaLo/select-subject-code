let codigos = [];
let materias = [];

fetch("./subjectsData.json")
  .then((response) => response.json())
  .then((data) => {
    materias = data;
    // const codigos = [];
    const tableBody = document.getElementById("table-body");

    materias.forEach((materia, rowIndex) => {
      const tr = document.createElement("tr");

      const tdName = document.createElement("td");
      tdName.textContent = materia.name;
      tr.appendChild(tdName);

      // Crear los botones con los códigos V1 a V4
      const codes = [
        materia.codeV1,
        materia.codeV2,
        materia.codeV3,
        materia.codeV4,
      ];

      codes.forEach((code, colIndex) => {
        const td = document.createElement("td");
        const btn = document.createElement("button");
        btn.classList.add("code-btn");
        td.classList.add("no-print");
        btn.textContent = code;
        btn.dataset.row = rowIndex;
        btn.dataset.col = colIndex + 1;

        btn.addEventListener("click", () => {
          const rowBtns = document.querySelectorAll(
            `button[data-row='${rowIndex}']`
          );
          rowBtns.forEach((b) => b.classList.remove("selected"));

          // Si el botón estaba seleccionado, lo deseleccionamos y eliminamos el código de la lista
          rowBtns.forEach((rowBtn) => {
            if (codigos.includes(rowBtn.textContent)) {
              const index = codigos.indexOf(rowBtn.textContent);
              if (index !== -1) {
                codigos.splice(index, 1);
              }
            }
          });

          if (codigos.includes(code)) {
            btn.classList.remove("selected");
            // Eliminar el código de la lista de seleccionados
            const index = codigos.indexOf(code);

            if (index !== -1) {
              codigos.splice(index, 1);
            }

            const td = tr.querySelector("td.print");
            td.textContent = "";
          } else {
            // Si el botón no estaba seleccionado, lo seleccionamos y añadimos el código
            btn.classList.add("selected");
            materia.code = code;
            codigos.push(code);
            const td = tr.querySelector("td.print");
            if (td) {
              td.textContent = materia.code;
            }
          }
        });

        td.appendChild(btn);
        tr.appendChild(td);
      });

      const tdLast = document.createElement("td");
      tdLast.classList.add("print");

      tdLast.textContent = materia.code;
      tr.appendChild(tdLast);

      tableBody.appendChild(tr);
    });
  })
  .catch((error) => console.error("Error al cargar el JSON:", error));

// Confirmar y preparar para imprimir
document.getElementById("confirm").addEventListener("click", () => {
  // Ejecutar ventana de impresión
  window.print();
});
