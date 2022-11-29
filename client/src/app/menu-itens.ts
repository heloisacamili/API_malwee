import { ClientComponent } from "./client/client.component";
import { CollectionComponent } from "./collection/collection.component";
import { GroupComponent } from "./group/group.component";
import { ProductComponent } from "./product/product.component";
import { SubgroupComponent } from "./subgroup/subgroup.component";
import { UserComponent } from "./user/user.component";

export const MenuItens = [
    {
        path: 'group',
        caption : 'Grupo',
        icon : 'assessment',
        component: GroupComponent,
    },
    {
        path: 'subgroup',
        caption : 'Subgrupo',
        icon : 'assessment',
        component: SubgroupComponent,
    },
    {
        path: 'collection',
        caption : 'Coleção',
        icon : 'toc',
        component: CollectionComponent,
    },
    {
        path: 'product',
        caption : 'Produtos',
        icon : 'shopping_basket',
        component: ProductComponent,
    },
    {
        path: 'client',
        caption : 'Clientes',
        icon : 'supervisor_account',
        component: ClientComponent,
    },
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'person',
        component: UserComponent,
    }
]