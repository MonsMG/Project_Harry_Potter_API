// src/app/harry-potter/helpers/resources.ts

import { Character, Spell } from '../types/api';

const API_BASE_URL = 'https://hp-api.onrender.com/api';

// 1. ดึงข้อมูลตัวละครทั้งหมด
export async function fetchAllCharacters(): Promise<Character[]> {
  const response = await fetch(`${API_BASE_URL}/characters`);
  if (!response.ok) throw new Error('Failed to fetch characters');
  return response.json();
}

// 2. ดึงข้อมูลตัวละครแบบเจาะจงรายบุคคล (API จะส่งกลับมาเป็น Array ที่มี 1 ตัว)
export async function fetchCharacterById(id: string): Promise<Character[]> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);
  if (!response.ok) throw new Error('Failed to fetch character details');
  return response.json();
}

// 3. ดึงข้อมูลตัวละครแยกตามบ้าน (เช่น gryffindor, slytherin, ravenclaw, hufflepuff)
export async function fetchCharactersByHouse(house: string): Promise<Character[]> {
  const response = await fetch(`${API_BASE_URL}/characters/house/${house}`);
  if (!response.ok) throw new Error(`Failed to fetch characters for house: ${house}`);
  return response.json();
}

// 4. ดึงข้อมูลตัวละครที่เป็นนักเรียน หรือ บุคลากร (เผื่อใช้ในหน้าหมวกคัดสรร)
export async function fetchCharactersByRole(role: 'students' | 'staff'): Promise<Character[]> {
  const response = await fetch(`${API_BASE_URL}/characters/${role}`);
  if (!response.ok) throw new Error(`Failed to fetch ${role}`);
  return response.json();
}

// 5. ดึงข้อมูลคาถาทั้งหมด
export async function fetchAllSpells(): Promise<Spell[]> {
  const response = await fetch(`${API_BASE_URL}/spells`);
  if (!response.ok) throw new Error('Failed to fetch spells');
  return response.json();
}

// 6. ดึงข้อมูลคาถาแบบเจาะจงรายตัว
export async function fetchSpellById(id: string): Promise<Spell> {
  const response = await fetch(`${API_BASE_URL}/spells`);
  if (!response.ok) throw new Error('Failed to fetch spells');
  const spells: Spell[] = await response.json();
  const spell = spells.find(s => s.id === id);
  if (!spell) throw new Error(`Spell not found: ${id}`);
  return spell;
}