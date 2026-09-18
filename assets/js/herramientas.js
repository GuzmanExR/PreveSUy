document.addEventListener('DOMContentLoaded', () => {
  const CATEGORIAS = ['Todas', 'Líneas de ayuda', 'Documentos y guías', 'Videos', 'Contactos institucionales', 'Contenido educativo'];
  const EDADES = ['Todas', 'Niños', 'Adolescentes', 'Adultos'];

  const recursos = [
    { categoria: 'Líneas de ayuda', edad: 'Niños', titulo: 'Línea de apoyo para niñas y niños', descripcion: 'Canales de escucha inmediata y recursos para buscar apoyo en situación de crisis o angustia.', color: 'yellow' },
    { categoria: 'Líneas de ayuda', edad: 'Adolescentes', titulo: 'Apoyo emocional adolescente', descripcion: 'Guías para reconocer señales y pedir ayuda sin miedo a ser juzgado o rechazado.', color: 'blue' },
    { categoria: 'Líneas de ayuda', edad: 'Adultos', titulo: 'Línea de apoyo para adultos', descripcion: 'Espacio de escucha confidencial para momentos difíciles, estrés intenso o crisis emocional.', color: 'sky' },
    { categoria: 'Documentos y guías', edad: 'Niños', titulo: 'Guía para hablar con niños', descripcion: 'Sugerencias concretas para acompañar a niñas y niños cuando están angustiados o asustados.', color: 'yellow' },
    { categoria: 'Documentos y guías', edad: 'Adolescentes', titulo: 'Cómo acompañar a un/a adolescente', descripcion: 'Recursos para iniciar conversaciones sensibles, cálidas y respetuosas.', color: 'blue' },
    { categoria: 'Documentos y guías', edad: 'Adultos', titulo: 'Rutinas para cuidar la salud mental', descripcion: 'Pequeños hábitos diarios para sostener el bienestar y reducir la sensación de sobrecarga.', color: 'sky' },
    { categoria: 'Videos', edad: 'Niños', titulo: 'Video de respiración tranquila', descripcion: 'Técnicas breves para bajar la intensidad de la ansiedad y calmar la mente.', color: 'yellow' },
    { categoria: 'Videos', edad: 'Adolescentes', titulo: 'Técnicas para regular emociones', descripcion: 'Alternativas simples para identifcar estados emocionales y gestionar la tensión.', color: 'blue' },
    { categoria: 'Videos', edad: 'Adultos', titulo: 'Video de apoyo emocional', descripcion: 'Ideas prácticas para encontrar calma, poner límites y pedir ayuda ante situaciones difíciles.', color: 'sky' },
    { categoria: 'Contactos institucionales', edad: 'Niños', titulo: 'Red de contacto escolar', descripcion: 'Personas y espacios dentro de la escuela para hablar con alguien de confianza.', color: 'yellow' },
    { categoria: 'Contactos institucionales', edad: 'Adolescentes', titulo: 'Centros de atención y apoyo', descripcion: 'Referencias para buscar asistencia profesional o comunitaria cuando se necesita acompañamiento.', color: 'blue' },
    { categoria: 'Contactos institucionales', edad: 'Adultos', titulo: 'Servicios de apoyo comunitario', descripcion: 'Recursos locales y profesionales para sostener el bienestar y prevenir el aislamiento.', color: 'sky' },
    { categoria: 'Contenido educativo', edad: 'Niños', titulo: 'Educación emocional para la infancia', descripcion: 'Materiales sencillos para aprender a nombrar emociones y pedir ayuda.', color: 'yellow' },
    { categoria: 'Contenido educativo', edad: 'Adolescentes', titulo: 'Mitos y verdades sobre la salud mental', descripcion: 'Información útil para desmentir ideas equivocadas y hablar con mayor claridad.', color: 'blue' },
    { categoria: 'Contenido educativo', edad: 'Adultos', titulo: 'Herramientas para la contención', descripcion: 'Formas de acompañar sin juzgar, escuchar sin presión y sostener la conexión.', color: 'sky' }
  ];

  let categoriaActiva = 'Todas';
  let edadActiva = 'Todas';
  let textoBusqueda = '';

  const grid = document.getElementById('resourceGrid');
  const chipsCategoria = document.getElementById('chipsCategoria');
  const chipsEdad = document.getElementById('chipsEdad');
  const buscador = document.getElementById('resourceSearch');

  const renderChips = (container, items, activeValue, key) => {
    container.innerHTML = items.map((item) => {
      const isActive = item === activeValue ? 'active' : '';
      return `<button type="button" class="chip ${isActive}" data-${key}="${item}">${item}</button>`;
    }).join('');

    container.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const value = chip.getAttribute(`data-${key}`);
        if (key === 'categoria') {
          categoriaActiva = value;
        } else {
          edadActiva = value;
        }
        render();
      });
    });
  };

  const renderGrid = () => {
    const lista = recursos.filter((recurso) => {
      const coincideCategoria = categoriaActiva === 'Todas' || recurso.categoria === categoriaActiva;
      const coincideEdad = edadActiva === 'Todas' || recurso.edad === edadActiva;
      const coincideTexto = !textoBusqueda ||
        recurso.titulo.toLowerCase().includes(textoBusqueda) ||
        recurso.descripcion.toLowerCase().includes(textoBusqueda) ||
        recurso.categoria.toLowerCase().includes(textoBusqueda);

      return coincideCategoria && coincideEdad && coincideTexto;
    });

    if (lista.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <strong>No encontramos resultados</strong>
          <span>Probá con otra búsqueda o cambia los filtros.</span>
        </div>
      `;
      return;
    }

    grid.innerHTML = lista.map((recurso) => `
      <article class="resource-card ${recurso.color}">
        <div class="resource-meta">
          <span class="tag category">${recurso.categoria}</span>
          <span class="tag age">${recurso.edad}</span>
        </div>
        <h3>${recurso.titulo}</h3>
        <p>${recurso.descripcion}</p>
        <a href="soporteAyuda.html">Ver más</a>
      </article>
    `).join('');
  };

  const render = () => {
    renderChips(chipsCategoria, CATEGORIAS, categoriaActiva, 'categoria');
    renderChips(chipsEdad, EDADES, edadActiva, 'edad');
    renderGrid();
  };

  if (buscador) {
    buscador.addEventListener('input', (event) => {
      textoBusqueda = event.target.value.trim().toLowerCase();
      renderGrid();
    });
  }

  render();
});
