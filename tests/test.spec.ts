import test, { expect } from "@playwright/test";

test.beforeEach( async ({page}) =>{  
  await page.goto('http://localhost:3000')
  
  await page.locator('form')
  .filter({ has: page.getByRole('heading', { name: 'login', level: 1 }) })
  .locator('input[type=text]')
  .fill('admin')
  
  await page.locator('form')
  .filter({ has: page.getByRole('heading', { name: 'login', level: 1 }) })
  .locator('input[type=password]')
  .fill('admin')

  await page.getByRole('button', {name: 'login'}).click()
  await page.waitForURL('http://localhost:3000/');
}
)
test('login', async ({page}) => {
  await expect(page).toHaveURL('http://localhost:3000/')
})

test('post a bill', async ({page}) => {
  const billName = 'New Bill'
  await page.getByPlaceholder('Bill Name').fill(billName)
  await page.getByPlaceholder('Amount').fill('50')
  await page.getByPlaceholder('Due Date').fill('2025-02-15')
  await page.getByRole('button', { name: 'Add Bill' }).click()
  await expect(page.getByRole('textbox', { name: `bill name ${billName}` })).toHaveValue(billName);
})

test('delete a bill', async ({ page }) => {
  const billName = 'Agua' 

  const billRow = page.getByRole('listitem').filter({ 
    has: page.getByRole('textbox', { name: `bill name ${billName}` }) 
  });
  
  await billRow.getByRole('button').click();

  const inputRemoved = page.getByRole('textbox', { name: `bill name ${billName}` });
  await expect(inputRemoved).toHaveCount(0);
});