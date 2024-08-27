const otherSettings = [
    { name: 'bgSettings', href: '#bgSettings' },
    { name: 'LoaclForageSettings', href: '#LoaclForageSettings' }
]

/* (globalThis as any)['otherSettings'] = otherSettings; */

export default otherSettings
{
    /* 
    <a
    v-for="el in otherSettings"
    data-bs-toggle="modal"
    :key="el.name"
    class="nav-link"
    :href="el.href"
    >{{ el.name }}</a>
    */
}
