use regex::Regex;

fn get_int(caps: &regex::Captures, i: usize) -> usize {
    caps.get(i).unwrap().as_str().parse().unwrap()
}

fn do_part(part_one: bool) -> String {
    let mut stacks: [Vec<char>; 9] = Default::default();
    let mut file_lines: std::str::Lines = include_str!("five.in").lines();
    for line in file_lines
        .by_ref()
        .take(8)
        .collect::<Vec<_>>()
        .into_iter()
        .rev()
    {
        for (i, c) in line.chars().skip(1).step_by(4).enumerate() {
            if c != ' ' {
                stacks[i].push(c);
            }
        }
    }
    let re = Regex::new(r"^move (\d+) from (\d+) to (\d+)$").unwrap();
    for line in file_lines.skip(2) {
        let caps = re.captures(line).unwrap();
        assert!(caps.len() == 4);
        let n = get_int(&caps, 1);
        let src_i = get_int(&caps, 2) - 1;
        let dest_i = get_int(&caps, 3) - 1;
        let src;
        let dest;
        assert!(src_i != dest_i);
        if src_i < dest_i {
            let (front, back) = stacks.split_at_mut(src_i + 1);
            src = &mut front[src_i];
            dest = &mut back[dest_i - src_i - 1];
        } else {
            let (front, back) = stacks.split_at_mut(dest_i + 1);
            dest = &mut front[dest_i];
            src = &mut back[src_i - dest_i - 1];
        }
        if part_one {
            for _ in 0..n {
                let container = src.pop().unwrap();
                dest.push(container);
            }
        } else {
            let first_idx = src.len() - n;
            for c in src.drain(first_idx..) {
                dest.push(c);
            }
        }
    }
    stacks.iter().map(|s| s.last().unwrap()).collect::<String>()
}

pub fn part_one() -> String {
    do_part(true)
}

pub fn part_two() -> String {
    do_part(false)
}
