---
title: Контакти
form:
  name: contact
  action: /bg
  method: POST
  fields:
    - name: name
      type: text
      validate:
        required: true
    - name: email
      type: email
      validate:
        required: true
    - name: message
      type: textarea
      validate:
        required: true
  process:
    - email:
        subject: "[NetShell] Ново запитване от {{ form.value.name }}"
        body: "<p><strong>Име:</strong> {{ form.value.name }}</p><p><strong>Имейл:</strong> {{ form.value.email }}</p><p><strong>Съобщение:</strong></p><p>{{ form.value.message|nl2br }}</p>"
        from: hi@nsh.one
        to: hi@nsh.one
    - reset: true
---

<p class="about__text">Имате проект наум? Ще се радваме да чуем от вас. Независимо дали е нова уеб апликация, IoT интеграция или консултация за вашия технологичен стек — свържете се с нас и нека го реализираме.</p>
