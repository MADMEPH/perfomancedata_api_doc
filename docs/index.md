---
layout: page
title: Performance Data API - Redirecting
---

<script setup>
import { withBase } from 'vitepress'
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    const targetUrl = withBase('/guide/getting-started')
    setTimeout(() => {
      window.location.href = targetUrl
    }, 100)
  }
})
</script>

<div style="padding: 60px 20px; text-align: center; max-width: 600px; margin: 0 auto;">
  <div style="font-size: 48px; margin-bottom: 20px;">📖</div>
  <h1 style="margin-bottom: 20px;">Redirecting to Documentation...</h1>
  <p style="color: #666; margin-bottom: 30px;">You will be redirected in a moment.</p>
  <p style="margin-top: 20px;">
    If you are not redirected automatically, please 
    <a :href="withBase('/guide/getting-started')" style="color: #646cff; text-decoration: none; font-weight: 500;">click here</a>.
  </p>
</div>
