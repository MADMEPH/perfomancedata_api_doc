---
layout: page
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(() => {
  router.go('/ru/guide/getting-started')
})
</script>

# Перенаправление...

Если вы не были перенаправлены автоматически, пожалуйста, нажмите [здесь](/ru/guide/getting-started).
