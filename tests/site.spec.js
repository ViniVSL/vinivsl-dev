const { test, expect } = require('@playwright/test');

test.describe('Portfólio Vinícius Santana - Testes de Regressão Visual e Lógica', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Espera o carregamento para garantir que o particles.js e fontes subiram
    await page.waitForLoadState('networkidle');
  });

  test('Deve validar o Header e a Identidade Visual', async ({ page }) => {
    // Verifica o título da página
    await expect(page).toHaveTitle(/Vinícius Santana | Software Engineer/);

    // Verifica se a logo está renderizada
    const logo = page.locator('.logo').first();
    await expect(logo).toContainText('VINICIUS');
    await expect(logo.locator('span')).toHaveText('.DEV');
  });

  test('Deve validar a animação Typewriter (Intersection Observer)', async ({ page }) => {
    const typewriter = page.locator('.type-text');

    // Começa PAUSADA
    const initialState = await typewriter.evaluate(el => window.getComputedStyle(el).animationPlayState);
    expect(initialState).toBe('paused');

    // Dispara o IntersectionObserver
    await typewriter.scrollIntoViewIfNeeded();

    // Execução da lógica do script main.js
    await page.waitForTimeout(500);

    const activeState = await typewriter.evaluate(el => window.getComputedStyle(el).animationPlayState);
    expect(activeState).toBe('running');
  });

  test('Deve validar a biblioteca de Partículas (particles.js)', async ({ page }) => {
    // A biblioteca particles.js injeta um canvas dentro da div #particles-js
    const particlesCanvas = page.locator('#particles-js canvas');
    await expect(particlesCanvas).toBeAttached();
  });

  test('Deve validar o funcionamento do Carrossel de Tecnologias', async ({ page }) => {
    const track = page.locator('.testimonials-track');
    const nextBtn = page.locator('.next-btn');

    // Captura a posição inicial do trilho
    const initialTransform = await track.evaluate(el => window.getComputedStyle(el).transform);

    // Clica no botão "Próximo"
    await nextBtn.click();

    // Aguarda o tempo da transição CSS
    await page.waitForTimeout(700);

    // Captura a nova posição e compara
    const newTransform = await track.evaluate(el => window.getComputedStyle(el).transform);
    expect(initialTransform).not.toBe(newTransform);
  });

  test('Deve validar os links de Contato e Redes Sociais', async ({ page }) => {
    // Verifica o link do WhatsApp no Hero
    const whatsappHero = page.locator('.hero .badge-tech');
    await expect(whatsappHero).toHaveAttribute('href', /wa.me\/5513996772869/);

    // Verifica se existem 4 ícones de contato no Footer
    const footerIcons = page.locator('.contact-icons a');
    await expect(footerIcons).toHaveCount(4);

    // Valida o link do LinkedIn especificamente
    const linkedin = page.locator('a[href*="linkedin.com/in/vinivsl-dev"]');
    await expect(linkedin).toBeVisible();
  });

  test('Responsividade: Menu deve ser ocultado em telas mobile', async ({ page }) => {
    // Define o viewport para mobile
    await page.setViewportSize({ width: 480, height: 800 });

    const menu = page.locator('.menu');
    await expect(menu).not.toBeVisible();
  });

  test('Deve validar a revelação de elementos ao rolar (Reveal Animation)', async ({ page }) => {
    const projectCard = page.locator('.repo-card').first();
    
    await projectCard.scrollIntoViewIfNeeded();
    
    await expect(projectCard).toHaveClass(/visible/);
    await expect(projectCard).toBeVisible();
  });
  
test('Deve garantir que os cards de certificação fiquem visíveis após o scroll', async ({ page }) => {
    const certCard = page.locator('.cert-card').first();
    
    // Dispara o IntersectionObserver
    await certCard.scrollIntoViewIfNeeded();
    
    // 1. Playwright confirma que o elemento está visível
    // O Playwright espera até que a opacidade seja > 0
    await expect(certCard).toBeVisible();

    // 2. Transição de 0.8s do CSS
    // Playwright tenta até o valor chegar em 1
    await expect(certCard).toHaveCSS('opacity', '1', { timeout: 10000 });

    // 3. Verifica se a classe .visible foi aplicada
    await expect(certCard).toHaveClass(/visible/);
  });
});
