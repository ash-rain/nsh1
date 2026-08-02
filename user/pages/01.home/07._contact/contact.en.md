---
title: Contact
form:
  name: contact
  action: /en
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
        subject: "[NetShell] New inquiry from {{ form.value.name }}"
        body: "<p><strong>Name:</strong> {{ form.value.name }}</p><p><strong>Email:</strong> {{ form.value.email }}</p><p><strong>Message:</strong></p><p>{{ form.value.message|nl2br }}</p>"
        from: hi@nsh.one
        to: hi@nsh.one
    - reset: true
---

<p class="about__text">Have a project in mind? We'd love to hear from you. Whether it's a new web application, an IoT integration, or a consultation about your technology stack — reach out and let's make it happen.</p>
