---
layout: page
title: Performance Data API - Redirecting
head:
  - - meta
    - http-equiv: refresh
      content: 0; url=/perfomancedata_api_doc/guide/getting-started
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.location.href = '/perfomancedata_api_doc/guide/getting-started'
  }
})
</script>

<div style="padding: 40px; text-align: center;">
  <h1>Redirecting to Documentation...</h1>
  <p style="margin-top: 20px;">If you are not redirected automatically, please <a href="./guide/getting-started">click here</a>.</p>
</div>
