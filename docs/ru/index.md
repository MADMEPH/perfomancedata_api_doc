---
layout: page
title: Performance Data API - Перенаправление
---

<script setup>
import { withBase } from 'vitepress'
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    const targetUrl = withBase('/ru/guide/getting-started')
    setTimeout(() => {
      window.location.href = targetUrl
    }, 100)
  }
})
</script>

<div style="padding: 60px 20px; text-align: center; max-width: 600px; margin: 0 auto;">
  <div style="font-size: 48px; margin-bottom: 20px;">📖</div>
  <h1 style="margin-bottom: 20px;">Перенаправление на документацию...</h1>
  <p style="color: #666; margin-bottom: 30px;">Вы будете перенаправлены через мгновение.</p>
  <p style="margin-top: 20px;">
    Если вы не были перенаправлены автоматически, пожалуйста, 
    <a :href="withBase('/ru/guide/getting-started')" style="color: #646cff; text-decoration: none; font-weight: 500;">нажмите здесь</a>.
  </p>
</div>
