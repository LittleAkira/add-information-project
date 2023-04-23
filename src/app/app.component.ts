import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { GoogleAuthProvider, browserLocalPersistence, getAuth, setPersistence, signInWithPopup } from 'firebase/auth';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  public isAdmin: boolean = false;
  public mainValue: string = '';
  public subValue: string = ''

  public mainCategories = [
    {
      "name": "Equipaggiamento",
      "value": "equip"
    },
    {
      "name": "Oggetti",
      "value": "item"
    },
    {
      "name": "Informazioni generali",
      "value": "general"
    },
  ];

  public subCategoryEquip = [
    {
      "name": "Armamento da mischia",
      "value": "melee armament"
    },
    {
      "name": "Arma a distanza/Catalizzatore",
      "value": "ranged weapon/catalyst"
    },
    {
      "name": "Scudo/Torcia",
      "value": "shield"
    },
    {
      "name": "Stregoneria",
      "value": "sorcery"
    },
    {
      "name": "Incantesimo",
      "value": "incantation"
    },
    {
      "name": "Talismano",
      "value": "talisman"
    },
    {
      "name": "Armatura",
      "value": "armor"
    },
    {
      "name": "Cenere di guerra",
      "value": "ash of war"
    },
    {
      "name": "Cenere (Evocazione)",
      "value": "ash"
    },
    {
      "name": "Freccia/Dardo",
      "value": "arrow/bolt"
    }
  ]
  public subCategoryItem = [
    {
      "name": "Oggetto chiave",
      "value": "key item"
    },
    {
      "name": "Strumento",
      "value": "tool"
    },
    {
      "name": "Materiale da creazione",
      "value": "crafting material"
    },
    {
      "name": "Materiale di rinforzo",
      "value": "bolstering material"
    }
  ]
  public subCategoryGeneral = [
        {
          "name": "Informazione",
          "value": "information"
        }
  ];

  public meleeType = [
    {
      "name": "Pugnale",
      "value": "dagger"
    },
    {
      "name": "Spada dritta",
      "value": "straight sword"
    },
    {
      "name": "Spadone",
      "value": "greatsword"
    },
    {
      "name": "Spada colossale",
      "value": "colossal sword"
    },
    {
      "name": "Spada perforante",
      "value": "thrusting sword"
    },
    {
      "name": "Spada perforante pesante",
      "value": "heavy thrusting sword"
    },
    {
      "name": "Spada curva",
      "value": "curved sword"
    },
    {
      "name": "Spadone curvo",
      "value": "curved greatsword"
    },
    {
      "name": "Katana",
      "value": "katana"
    },
    {
      "name": "Lama gemella",
      "value": "twinblade"
    },
    {
      "name": "Ascia",
      "value": "axe"
    },
    {
      "name": "Ascia pesante",
      "value": "greataxe"
    },
    {
      "name": "Martello",
      "value": "hammer"
    },
    {
      "name": "Flagello",
      "value": "flail"
    },
    {
      "name": "Martello da guerra",
      "value": "great hammer"
    },
    {
      "name": "Arma colossale",
      "value": "colossal weapon"
    },
    {
      "name": "Lancia",
      "value": "spear"
    },
    {
      "name": "Lancia pesante",
      "value": "great spear"
    },
    {
      "name": "Alabarda",
      "value": "halberd"
    },
    {
      "name": "Falce",
      "value": "reaper"
    },
    {
      "name": "Frusta",
      "value": "whip"
    },
    {
      "name": "Pugno",
      "value": "fist"
    },
    {
      "name": "Artiglio",
      "value": "claw"
    }
  ];
  public rangeType = [
    {
      "name": "Pugnale",
      "value": "light bow"
    },
    {
      "name": "Spada dritta",
      "value": "greatbow"
    },
    {
      "name": "Spadone",
      "value": "crossbow"
    },
    {
      "name": "Spada colossale",
      "value": "ballista"
    },
    {
      "name": "Spada perforante",
      "value": "glintstone staff"
    },
    {
      "name": "Spada perforante pesante",
      "value": "sacred seal"
    }
  ];
  public armorType = [
    {
      "name": "Testa",
      "value": "head"
    },
    {
      "name": "Torace",
      "value": "chest"
    },
    {
      "name": "Braccia",
      "value": "arms"
    },
    {
      "name": "Gambe",
      "value": "legs"
    }
  ];
  public toolType = [
    {
      "name": "Consumabile",
      "value": "consumable"
    },
    {
      "name": "Riusabile",
      "value": "reusable"
    }
  ];
  public ammoType = [
    {
      "name": "Freccia",
      "value": "arrow"
    },
    {
      "name": "Freccia pesante",
      "value": "greatarrow"
    },
    {
      "name": "Dardo",
      "value": "bolt"
    },
    {
      "name": "Dardo pesante",
      "value": "greatbolt"
    },
  ];
  public shieldType = [
    {
      "name": "Torcia",
      "value": "torch"
    },
    {
      "name": "Scudo piccolo",
      "value": "small shield"
    },
    {
      "name": "Scudo medio",
      "value": "medium shield"
    },
    {
      "name": "Scudo pesante",
      "value": "greatshield"
    },
  ];
  public ashWarType = [
    {
      "name": "Torcia",
      "value": "heavy"
    },
    {
      "name": "Scudo piccolo",
      "value": "keen"
    },
    {
      "name": "Scudo medio",
      "value": "quality"
    },
    {
      "name": "Granscudo",
      "value": "magic"
    },
    {
      "name": "Granscudo",
      "value": "fire"
    },
    {
      "name": "Granscudo",
      "value": "sacred"
    },
    {
      "name": "Granscudo",
      "value": "poison"
    },
    {
      "name": "Granscudo",
      "value": "blood"
    },
    {
      "name": "Granscudo",
      "value": "lightning"
    },
    {
      "name": "Granscudo",
      "value": "cold"
    },
    {
      "name": "Granscudo",
      "value": "occult"
    },
    {
      "name": "Granscudo",
      "value": "standard"
    }
  ];

  public damageTypes = [
    {
      "name":"Taglio",
      "value":"slash"
    },
    {
      "name":"Perforazione",
      "value":"pierce"
    },
    {
      "name":"Standard",
      "value":"standard"
    },
    {
      "name":"Impatto",
      "value":"strike"
    },
    {
      "name":"Nessuno",
      "value":"none"
    }
  ];

  public scalingStat = [
    {
      "name": 'Forza',
      "value": "scalingStr"
    },
    {
      "name": 'Destrezza',
      "value": "scalingDex"
    },
    {
      "name": 'Intelligenza',
      "value": "scalingInt"
    },
    {
      "name": 'Fede',
      "value": "scalingFai"
    },
    {
      "name": 'Arcano',
      "value": "scalingArc"
    }
  ];
  public requireStat = [

    {
      "name": 'Forza',
      "value": "reqStr"
    },
    {
      "name": 'Destrezza',
      "value": "reqDex"
    },
    {
      "name": 'Intelligenza',
      "value": "reqInt"
    },
    {
      "name": 'Fede',
      "value": "reqFai"
    },
    {
      "name": 'Arcano',
      "value": "reqArc"
    }
  ];

  public attStat = [
    {
      "name":"Fisico",
      "value":"att_phy" 
    },
    {
      "name":"Magia",
      "value":"att_mag"
    },
    {
      "name":"Fuoco",
      "value":"att_fire"
    },
    {
      "name":"Fulmine",
      "value":"att_light"
    },
    {
      "name":"Sacro",
      "value":"att_holy"
    },
    {
      "name":"Critico",
      "value":"att_crit"
    }
  ];
  public guardStat = [
    {
      "name":"Fisico",
      "value":"guard_phy"
    },
    {
      "name":"Magia",
      "value":"guard_mag"
    },
    {
      "name":"Fuoco",
      "value":"guard_fire"
    },
    {
      "name":"Fulmine",
      "value":"guard_light"
    },
    {
      "name":"Sacro",
      "value":"guard_holy"
    },
    {
      "name":"Incremento difesa",
      "value":"guard_boost"
    }
  ]

  public dmgNegationStat = [
    {
      "name":"Fisico",
      "value":"dmg_neg_phy"
    },
    {
      "name":"VS impatto",
      "value":"dmg_neg_strike"
    },
    {
      "name":"VS taglio",
      "value":"dmg_ngg_slash"
    },
    {
      "name":"VS perforazione",
      "value":"dmg_neg_pierce"
    },
    {
      "name":"Magia",
      "value":"dmg_neg_mag"
    },
    {
      "name":"Fuoco",
      "value":"dmg_neg_fire"
    },
    {
      "name":"Fulmine",
      "value":"dmg_neg_light"
    },
    {
      "name":"Sacro",
      "value":"dmg_neg_holy"
    }
  ]
  public resistanceStat = [
    {
      "name":"Immunità",
      "value":"res_imm"
    },
    {
      "name":"Robustezza",
      "value":"res_rob"
    },
    {
      "name":"Concentrazione",
      "value":"res_foc"
    },
    {
      "name":"Vitalità",
      "value":"res_vit"
    },
    {
      "name":"Stabilità",
      "value":"res_poise"
    }
  ]
  
  public scaleValues = ["A","B","C","D","E"];
  
  
  
  public images: any[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private _formBuilder: FormBuilder,
  ){}

  ngOnInit(){}

  public newInformation = this._formBuilder.group({
    mainCategory: new FormControl(null),
    subCategory: new FormControl(null),
    type: new FormControl(null),
    image: this._formBuilder.array([]),
    name: new FormControl(null),
    desc: new FormControl(null),
    effect: new FormControl(null),
    
    dmg_type: this._formBuilder.array([]),
    weight: new FormControl(null),

    scalingStr: new FormControl(null),
    scalingDex: new FormControl(null),
    scalingInt: new FormControl(null),
    scalingFai: new FormControl(null),
    scalingArc: new FormControl(null),

    reqStr: new FormControl(null),
    reqDex: new FormControl(null),
    reqInt: new FormControl(null),
    reqFai: new FormControl(null),
    reqArc: new FormControl(null),

    att_phy: new FormControl(null),
    att_mag: new FormControl(null),
    att_fire: new FormControl(null),
    att_light: new FormControl(null),
    att_holy: new FormControl(null),
    att_crit: new FormControl(null),

    guard_phy: new FormControl(null),
    guard_mag: new FormControl(null),
    guard_fire: new FormControl(null),
    guard_light: new FormControl(null),
    guard_holy: new FormControl(null),
    guard_boost: new FormControl(null),

    dmg_neg_phy: new FormControl(null),
    dmg_neg_strike: new FormControl(null),
    dmg_neg_slash: new FormControl(null),
    dmg_neg_pierce: new FormControl(null),
    dmg_neg_mag: new FormControl(null),
    dmg_neg_fire: new FormControl(null),
    dmg_neg_light: new FormControl(null),
    dmg_neg_holy: new FormControl(null),

    res_imm: new FormControl(null),
    res_rob: new FormControl(null),
    res_foc: new FormControl(null),
    res_vit: new FormControl(null),
    res_poise: new FormControl(null),

    fpCost: new FormControl(null),
    hpCost: new FormControl(null),
    sellValue: new FormControl(null),
    costValue: new FormControl(null),
    skillName: new FormControl(null),

    passive: new FormControl(null),
    skill: new FormControl(null),
    attack: new FormControl(null),
    guard: new FormControl(null),
    dmg_negation: new FormControl(null),
    resistance: new FormControl(null),
    n_slot: new FormControl(null),
    obtain: new FormControl(null),
    craftable: new FormControl(null)
  });


  public login() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithPopup(auth, provider).then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
    });
    this.firebaseService.admin.subscribe({
      next: res => this.isAdmin = res,
      error: err => console.log(err)
    })
  }

  public onCheckboxChange(e: any, value: string) {
    const checkArray: FormArray = this.newInformation.get('dmg_type') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  public addImage(event: any) {
    const photoArray: FormArray = this.newInformation.get('image') as FormArray;
    const inputNode: any = document.querySelector('#picture');
    if (typeof FileReader !== undefined) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (e.total <= 5000000 && inputNode.files.length > 0) {
          //5mb
          this.firebaseService
            .uploadPicture(inputNode.files[0], '')
            .then((result) => {
              // VIENE CREATO UN OGGETTO CHE CONTIENE NOME E URL DELL'IMMAGINE INSERITA
              let image = {
                name: inputNode.files[0].name,
                url: result
              }
              this.images.push(image)
              photoArray.push(new FormControl(result));
            });
        } else {
          inputNode.value = '';
        }
      };
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  public deleteImage(photo: any){
    const photoArray: FormArray = this.newInformation.get('image') as FormArray;
    this.firebaseService.deletePicture('', photo.name)
    this.images = this.images.filter(p => p.name !== photo.name)
    let i: number = 0;
    photoArray.controls.forEach((item: any) => {
      if (item.value == photo.url) {
        photoArray.removeAt(i);
        return;
      }
      i++;
    })
  }

  public saveInformation(lang: string){
    console.log(this.subValue)
    if(this.subValue === 'tool'){
      this.firebaseService.addTool(lang, this.newInformation.value);
    } else if (this.subValue === 'ash'){
      this.firebaseService.addAsh(lang, this.newInformation.value);      
    } else if (this.subValue === 'key item'){
      this.firebaseService.addKeyItem(lang, this.newInformation.value)
    } else if (this.subValue === 'crafting material'){
      this.firebaseService.addCraftingMaterial(lang, this.newInformation.value)
    } else if (this.subValue === 'bolstering material'){
      this.firebaseService.addBolsteringMaterial(lang, this.newInformation.value)
    } else if (this.subValue === 'incantation' || this.subValue === 'sorcery'){
      this.firebaseService.addSorceryAndIncantation(lang, this.newInformation.value)
    } else if (this.subValue === 'melee armament' || this.subValue === 'ranged weapon/catalyst' || this.subValue === 'shield'){
      this.firebaseService.addWeaponAndShield(lang, this.newInformation.value)
    } else if (this.subValue === 'ash war'){
      this.firebaseService.addAshWar(lang, this.newInformation.value)
    } else if (this.subValue === 'arrow/bolt'){
      this.firebaseService.addAmmo(lang, this.newInformation.value)
    } else if (this.subValue === 'armor'){
      this.firebaseService.addArmor(lang, this.newInformation.value)
    } else if (this.subValue === 'talisman'){
      this.firebaseService.addTalisman(lang, this.newInformation.value)
    }
  }


}