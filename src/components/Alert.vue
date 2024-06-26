<template>
    <Transition>
        <div
            v-show="visible"
            :class="[f.b(), f.e('alert'), f.m(type)]"
        >
            <span v-if="showIcon && iconComponent" :class="f.m('icon')">
                <component :is="iconComponent" />
            </span>

            <div :class="f.e('content')">
                <span v-if="title || $slots.title" :class="f.e('title')">
                    <slot name="title">{{ title }}</slot>
                </span>

                <p v-if="description || $slots.description" :class="f.e('description')">
                    <slot name="description">{{ description }}</slot>
                </p>

                <template v-if="canClose">
                    <i @click="close" :class="f.e('close-btn')"/>
                </template>
            </div>
        </div>
    </Transition>
</template>


<script setup lang="ts">

import { computed, ref } from 'vue'
import { useBem } from '../utils/useBem'
import { IconMapper } from '../utils/iconMapper'

defineOptions({
    name: 'alert'
})

const props = defineProps<{
    title: string
    description: string
    canClose: boolean
    type: string
    showIcon?: boolean
}>()

const emit = defineEmits<{
    close: [e: MouseEvent]
}>()

const visible = ref(true)
const f = useBem("alert")

const iconComponent = computed(() => IconMapper[props.type])

const close = (e: MouseEvent) => {
    visible.value = false;
    emit('close', e)
}

</script>