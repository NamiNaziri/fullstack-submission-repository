
const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith,createBlog } = require('./helper')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {

    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'root',
        username: 'root',
        password: 'sekret'
      }
    })


    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'sekret')
    
      await expect(page.getByText('root logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrong')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credentials')

      await expect(page.getByText('root logged in')).not.toBeVisible()
    })
  })


  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'sekret')
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        author: 'amin akbari',
        likes: 15,
        title: 'the art of programming',
        url: 'abc.com',
        user: '22412343214'
      }
      await createBlog(page,blog)
      await expect(page.getByText('the art of programming').last()).toBeVisible()
    })
  })  

  describe('when logged in and a blog is created', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'sekret')
      const blog = {
        author: 'amin akbari',
        likes: 15,
        title: 'the art of programming',
        url: 'abc.com',
        user: '22412343214'
      }
      await createBlog(page,blog)
    })

    test( 'the blog can be liked.', async ({ page }) => {
      await page.getByRole('button', { name: 'show' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByTestId('like-testid').getByText('1')).toBeVisible()
    })


    test( 'user who added the blog can delete the blog.', async ({ page }) => {
      await page.getByRole('button', { name: 'show' }).click()

      page.on('dialog', async dialog => {
        if (dialog.type() === 'confirm') {
          await dialog.accept();
        }
      });
      await page.getByRole('button', { name: 'remove' }).click()
      await page.waitForTimeout(1000);
      
      await expect(page.getByText('abc.com').last()).toBeHidden()
    })


  describe('Second user created', () => {
    beforeEach(async ({ page, request }) => {

      await request.post('/api/users', {
        data: {
          name: 'user2',
          username: 'user2',
          password: 'pass'
        }
      })
    })
  test.only( 'only the user who added the blog sees the blog\'s delete button', async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click()
    await loginWith(page, 'user2', 'pass')
    await page.getByRole('button', { name: 'show' }).click()

    await expect(page.getByText('remove').last()).toBeHidden()
  })
})  
})  


  


})