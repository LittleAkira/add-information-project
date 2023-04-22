import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, Firestore, GeoPoint, getDoc, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { BehaviorSubject } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyA3pOdvByh95IVV0txLL8DkG3uA_sHePV4",
  authDomain: "elden-ring-wiki-d1a67.firebaseapp.com",
  projectId: "elden-ring-wiki-d1a67",
  storageBucket: "elden-ring-wiki-d1a67.appspot.com",
  messagingSenderId: "693607464470",
  appId: "1:693607464470:web:996df09d5b5b1213697f37",
  measurementId: "G-D2CEXSRYF1"
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private database: Firestore;
  private storage: FirebaseStorage;


  public admin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {
    this.database = getFirestore(app);
    this.storage = getStorage(app);
    const auth = getAuth();

    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        this.getUser(user.uid).then(r => {
          if(r){
            this.admin.next(true);
          } else {
            this.admin.next(false);
          }
        })
      }
    });
  }

  public async getUser(userId: string) {
    const ref = doc(this.database, 'adminUser', userId);
    const docSnap = await getDoc(ref);
    if(docSnap.exists()){
      console.log(docSnap.data())
      return docSnap.data();
    } else {
      return null
    }
  }

  public async uploadPicture(file: File, id: string): Promise<string>{
    const path = "test/" + id + "/" + file.name;
    const metadata = {
      contentType: 'image/jpeg',
    };
    
    return uploadBytes(ref(this.storage, path), file, metadata).then(snapShot => {
      return getDownloadURL(ref(this.storage, path));
    }).catch(err => {
      console.log(err);
      return '';
    })
  }

  public deletePicture(id: string, fileName: string): Promise<string>{
    const path = "test/" + id + "/" + fileName;
    return deleteObject(ref(this.storage, path)).then(() => {
      return 'success'
    }).catch(err => {
      console.log(err);
      if(err.customData.serverResponse.toLowerCase().includes("not found")){
        return "not found";
      }
      return err;
    })
  }
 
  public async addTool(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      fp_cost: information.fpCost,
      scale: {
        str: information.scalingStr,
        dex: information.scalingDex,
        int: information.scalingInt,
        fai: information.scalingFai,
        arc: information.scalingArc
      },
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }

  public async addAsh(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      fp_cost: information.fpCost,
      hp_cost: information.hpCost,
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }

  public async addKeyItem(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }

  public async addCraftingMaterial(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      obtain: information.obtain,
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }

  public async addBolsteringMaterial(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }

  public async addSorceryAndIncantation(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      fp_cost: information.fpCost,
      hp_cost: information.hpCost,
      slot: information.slot,
      require: {
        str: information.reqStr,
        dex: information.reqDex,
        int: information.reqInt,
        fai: information.reqFai,
        arc: information.reqArc,
      },
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }

  public async addWeaponAndShield(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      fp_cost: information.fpCost,
      slot: information.slot,
      dmg_type: information.dmg_type,
      require: {
        str: information.reqStr,
        dex: information.reqDex,
        int: information.reqInt,
        fai: information.reqFai,
        arc: information.reqArc,
      },
      scale: {
        str: information.scalingStr,
        dex: information.scalingDex,
        int: information.scalingInt,
        fai: information.scalingFai,
        arc: information.scalingArc,
      },
      att_pwr: {
        phy: information.att_phy,
        mag: information.att_mag,
        fire: information.att_fire,
        light: information.att_light,
        holy: information.att_holy,
        crit: information.att_crit
      },
      guard_dmg: {
        phy: information.guard_phy,
        mag: information.guard_mag,
        fire: information.guard_fire,
        light: information.guard_light,
        holy: information.guard_holy,
        boost: information.guard_boost
      },
      passive: information.passive,
      skill: information.skillName,
      wgt: information.weight,
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }

  public async addAmmo(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      dmg_type: information.dmg_type,
      att_pwr: {
        phy: information.att_phy,
        mag: information.att_mag,
        fire: information.att_fire,
        light: information.att_light,
        holy: information.att_holy,
        crit: information.att_crit
      },
      passive: information.passive,
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }

  public async addArmor(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      slot: information.slot,
      dmg_type: information.dmg_type,
      res_dmg: {
        phy: information.dmg_neg_phy,
        strike: information.dmg_neg_strike,
        slash: information.dmg_neg_slash,
        pierce: information.dmg_neg_pierce,
        mag: information.dmg_neg_mag,
        fire: information.dmg_neg_fire,
        light: information.dmg_neg_light,
        holy: information.dmg_neg_holy
      },
      res: {
        imm: information.res_imm,
        rob: information.res_rob,
        foc: information.res_foc,
        vit: information.res_vit,
        poise: information.res_poise
      },
      wgt: information.weight,
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }

  public async addAshWar(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }

  public async addTalisman(information: any){
    return await addDoc(collection(this.database, 'italian'), {
      main_category: information.mainCategory,
      sub_category: information.subCategory,
      type: information.type,
      name: information.name,
      desc: information.desc,
      effect: information.effect,
      wgt: information.weight,
      sell_value: information.sellValue,
      cost_value: information.costValue
    });
  }
}
