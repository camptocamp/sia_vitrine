<!--
  This file is part of SIA 62.
  SIA 62 is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
  SIA 62 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
  You should have received a copy of the GNU Affero General Public License along with SIA 62. If not, see <https://www.gnu.org/licenses/>.
-->

<script setup lang="ts">
import type { Mobilier } from '@/domain/mobilier'
import type { NavigationItems } from '@/domain/navigation'
import { ImageType, Photographie } from '@/domain/photographie'
import { nextTick, onMounted, useTemplateRef } from 'vue'

defineProps<{
  showThumbnails: boolean
  items: NavigationItems
  active?: number
  linkToMobilier?: boolean
}>()
const emit = defineEmits<{
  focus: [event: MouseEvent, mobilier: Mobilier | null]
}>()
const list = useTemplateRef<HTMLUListElement>('list')

onMounted(() => {
  nextTick(() => {
    const activeItem = list.value?.querySelector('.active')
    activeItem?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  })
})
</script>

<template>
  <ul ref="list">
    <li
      v-for="item in items"
      :key="item.id"
      :class="{ active: active === item.id, secondary: item.niveau === 2 }"
    >
      <div class="label">
        <router-link
          v-if="linkToMobilier && item.mobiliers && item.mobiliers.length"
          :to="{ name: 'mobilier', params: { id: item.mobiliers[0].id } }"
          >{{ item.label }}<span>{{ item.dates }}</span></router-link
        >
        <router-link v-else :to="{ name: 'parcours', params: { id: item.id } }"
          >{{ item.label }}<span>{{ item.dates }}</span></router-link
        >
      </div>
      <div class="photos" v-if="showThumbnails">
        <router-link
          v-for="mobilier in item.mobiliers"
          :key="mobilier.id"
          :to="{ name: 'mobilier', params: { id: mobilier.id } }"
          @mousemove="emit('focus', $event, mobilier)"
          @mouseleave="emit('focus', $event, null)"
          ><img
            :src="Photographie.getImageUrl(mobilier.photographies[0], ImageType.Low)"
            :alt="mobilier.determination"
        /></router-link>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  position: relative;
  margin: 0;
  padding: 0;
}
ul::before {
  background: var(--primary);
  top: calc(var(--line-height) / 2);
  bottom: calc(var(--line-height) / 2);
  width: 2px;
  content: '';
  position: absolute;
}
li {
  --size: 0.6rem;
  padding-left: 1rem;
  text-align: left;
  position: relative;
  height: var(--line-height);
  line-height: var(--line-height);
  margin-left: 1rem;
  border-bottom: 1px solid var(--primary);
  display: flex;
  color: var(--primary);
}
li.active {
  color: var(--tertiary);
}
li:last-child {
  border-bottom: none;
}
li.secondary {
  padding-left: 2rem;
  font-style: italic;
}
.label {
  text-shadow:
    0 0 6px var(--base),
    0 0 5px var(--base),
    0 0 4px var(--base),
    0 0 3px var(--base);
  transition: font 0.25s ease;
}
.label a {
  text-decoration: none;
  color: var(--color);
  display: inline-block;
}
.label span {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.8rem;
  opacity: 0.6;
}
.secondary .label span {
  left: 2rem;
}
li:before {
  content: '';
  display: inline-block;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background: var(--base);
  border: 2px solid var(--primary);
  position: absolute;
  left: calc(calc(-0.5 * var(--size)) - 1rem);
  top: calc(50% - 0.5rem);
  transition: background 0.25s ease;
}

li.active .label,
li:hover .label {
  font-size: 19px;
}
li.active::before {
  --base: var(--tertiary);
}
li:hover::before {
  --base: var(--primary);
}

img {
  max-height: calc(var(--line-height) - 1rem);
}
.label {
  width: 15rem;
  flex-shrink: 0;
}
.photos {
  --gap: 0.5rem;
  --border: 3px;
  flex-grow: 1;
  display: flex;
  gap: calc(var(--gap) + 2 * var(--border));
  padding: var(--gap) var(--border);
  flex-basis: 30rem;
  overflow-x: auto;
  overflow-y: hidden;
}
a:hover {
  outline: var(--border) solid var(--secondary);
}
</style>
