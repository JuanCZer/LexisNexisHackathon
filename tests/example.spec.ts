import { test, expect } from '@playwright/test';

test('Consulta el endpoint, guarda los datos en una variable y valida al menos 5 personajes', async ({ request }) => {
  // Realizamos la consulta al endpoint
  const response = await request.get('https://rickandmortyapi.com/api/character');
  
  // Validamos que la respuesta sea exitosa
  expect(response.ok()).toBeTruthy();

  // Convertimos la respuesta a JSON y la guardamos en una variable
  const data = await response.json();
  console.log('Datos obtenidos:', data);
  
  // Almacenamos el array de personajes en una variable para futuras comprobaciones
  const characters = data.results;
  
  // Comprobamos que 'characters' es un arreglo y contiene al menos 5 elementos
  expect(Array.isArray(characters)).toBe(true);
  expect(characters.length).toBeGreaterThanOrEqual(20);
  
});


test('El usuario ingresa coordenadas y el mapa hace zoom in mostrando el marcador personalizado', async ({
  page,
}) => {
  // Navega a la ruta relativa (asegúrate de tener configurado baseURL en playwright.config.ts)
  await page.goto('http://localhost:4200/mapa');
  await page.waitForLoadState('networkidle');


  const latInput = page.locator('#lat');
  const lngInput = page.locator('#lng');
  const updateButton = page.locator('button', { hasText: 'Cambiar Ubicación' });

  // Ingresa nuevas coordenadas (ejemplo: Londres: 51.5074, -0.1278)
  await latInput.fill('19.429727460769172');
  await lngInput.fill('-99.1636975795175');

  // Haz clic en el botón para actualizar la ubicación
  await updateButton.click();

  // Espera un poco más que la duración de la animación (flyTo usa duration: 2 segundos)
  await page.waitForTimeout(2500);

  // Verifica que el marcador se haya agregado al DOM (Leaflet asigna la clase "leaflet-marker-icon")
  const marker = page.locator('.leaflet-marker-icon');
  await expect(marker).toBeVisible();
  await expect(marker).toHaveAttribute('src', /marker-icon\.png/);

  // Verifica que el zoom del mapa se haya actualizado a 18
  const zoom = await page.evaluate(() => (window as any).map.getZoom());
  expect(zoom).toBe(18);
});


test('El usuario ingresa a la ruta de personajes y hace clic en una tarjeta', async ({
  page,
}) => {
  // Navega a la ruta de personajes. Se asume que el baseURL está configurado en playwright.config.ts
  await page.goto('http://localhost:4200/personajes');
  await page.waitForLoadState('networkidle');

  // Localiza la tarjeta que contenga el texto "Abradolf Lincler"
  const tarjetaAbradolf = page.locator('.card', {
    hasText: 'Abradolf Lincler',
  });
  await expect(tarjetaAbradolf).toBeVisible();

  // Realiza clic sobre la tarjeta encontrada
  await tarjetaAbradolf.click();

  // Espera a que aparezca algún elemento interno del modal que contenga el nombre, o que indique que el modal se abrió
  // Aquí esperamos que el modal contenga el texto "Abradolf Lincler" en algún elemento visible
  const modalContent = page.locator('app-character-modal');
  await expect(modalContent).toContainText('Abradolf Lincler', {
    timeout: 10000,
  });
});

test('Imprime en consola los 5 personajes con más apariciones en los primeros 12 episodios', async ({ request }) => {
  // Consulta el endpoint de episodios
  const response = await request.get('https://rickandmortyapi.com/api/episode');
  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  // Obtén los primeros 12 episodios
  const episodes = data.results.slice(0, 12);

  // Cuenta apariciones de cada personaje (usando su URL como identificador)
  const appearanceCount: { [key: string]: number } = {};
  episodes.forEach((episode: any) => {
    episode.characters.forEach((characterUrl: string) => {
      appearanceCount[characterUrl] = (appearanceCount[characterUrl] || 0) + 1;
    });
  });

  // Ordena los personajes por número de apariciones de forma descendente
  const sortedCharacters = Object.entries(appearanceCount).sort(([, countA], [, countB]) => countB - countA);
  // Toma los 5 primeros
  const top5 = sortedCharacters.slice(0, 5);

  // Obtén los nombres de los personajes consultando su endpoint
  const top5WithNames = [];
  for (const [url, count] of top5) {
    const charResponse = await request.get(url);
    expect(charResponse.ok()).toBeTruthy();
    const charData = await charResponse.json();
    top5WithNames.push({ name: charData.name, count });
  }

  // Imprime en consola el resultado
  console.log('Top 5 personajes con más apariciones en los primeros 12 episodios:');
  top5WithNames.forEach(character => {
    console.log(`${character.name}: ${character.count} apariciones`);
  });
}
);