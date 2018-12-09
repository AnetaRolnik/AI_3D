from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from .chromedriver_path import path


class HomePageSeleniumTestCase(LiveServerTestCase):

    def setUp(self):
        self.browser = webdriver.Chrome(path)
        self.browser.get('http://127.0.0.1:8000/')
        self.browser.implicitly_wait(2)
        super().setUp()

    def tearDown(self):
        self.browser.quit()
        super().tearDown()

    def test_get_home_page(self):
        assert 'Akademia Inwentaryzacji' in self.browser.title

    def test_contact_form(self):
        correct_msg_send = 'Wiadomość została wysłana'
        input_name = self.browser.find_element_by_css_selector('#contactName')
        input_surname = self.browser.find_element_by_css_selector('#contactSurname')
        input_email = self.browser.find_element_by_css_selector('#contactEmail')
        input_msg = self.browser.find_element_by_css_selector('#contactMessage')
        input_name.send_keys('testname')
        input_surname.send_keys('testsurname')
        input_email.send_keys('test@email.com')
        input_msg.send_keys('Hej to testowa wiadomosc')

        submit_btn = WebDriverWait(self.browser, 5).until(
            EC.presence_of_element_located((By.CLASS_NAME, "contact-form-btn")))
        submit_btn.send_keys(Keys.ENTER)

        contact_form_state = WebDriverWait(self.browser, 2).until(
            EC.presence_of_element_located((By.CLASS_NAME, "contact-form-state")))

        self.assertEqual(contact_form_state.text, correct_msg_send)
